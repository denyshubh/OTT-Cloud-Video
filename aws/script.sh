#!/bin/bash

# Variables
base_url="https://d3phkff761rmuc.cloudfront.net"
secret_arn="arn:aws:secretsmanager:us-east-1:762631247299:secret:cloudFrontVODSecret-RC0G5G"
secret_name="cloudFrontVODSecret"
key_pair_id="APKA3DEC5KXBZWO7E56E"

# Retrieve base64-encoded private key from AWS Secrets Manager
private_key_base64=$(aws secretsmanager get-secret-value --secret-id "${secret_arn}" --query SecretBinary --output text)

# Decode private key and save to a temporary file
private_key_file=$(mktemp)
echo "${private_key_base64}" | base64 --decode > "${private_key_file}"

expiration_time=$(date -u -d "$(date +"%Y-%m-%d") 00:00:00 +15 days" +%s)

# Create policy statement
policy=$(cat <<EOF
{
  "Statement": [
    {
      "Resource": "${base_url}/*",
      "Condition": {
        "DateLessThan": {
          "AWS:EpochTime": ${expiration_time}
        },
      }
    }
  ]
}
EOF
)

# policy=$(cat <<EOF
# {
#   "Statement": [
#     {
#       "Resource": "${base_url}/*",
#       "Condition": {
#         "DateLessThan": {
#           "AWS:EpochTime": ${expiration_time}
#         },
#         "IpAddress": {
#           "AWS:SourceIp": "192.0.2.0/24"
#         }
#       }
#     }
#   ]
# }
# EOF
# )


# Encode policy statement
policy_base64=$(echo -n "${policy}" | openssl base64 -A)

# Generate signature
signature=$(echo -n "${policy}" | openssl sha1 -sign "${private_key_file}" | openssl base64 -A)

# Remove temporary private key file
rm "${private_key_file}"

# Generate signed URL
signed_url="${base_url}?Policy=${policy_base64}&Signature=${signature}&Key-Pair-Id=${key_pair_id}"
echo "Signed URL: ${signed_url}"