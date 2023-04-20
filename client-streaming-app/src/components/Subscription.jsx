import { API } from "aws-amplify";
import { useState, useEffect } from 'react';

export default function Subscription({ user }) {
  const [subscription, setSubscription] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({});

  useEffect(() => {
    async function fetchSubscription() {
      const subscriptionData = await API.get(
        "OTTPlatformAPI",
        `/users/${user.username}/subscription`
      );
      setSubscription(subscriptionData);
      setFormValues(subscriptionData);
    }
    fetchSubscription();
  }, [user]);

  async function handleSave() {
    const updatedSubscription = await API.put(
      "OTTPlatformAPI",
      `/users/${subscription.user_id}/subscription`,
      {
        body: formValues,
      }
    );
    setSubscription(updatedSubscription);
    setIsEditing(false);
  }

  return (
    <div className="Subscription">
      {isEditing ? (
        <form onSubmit={handleSave}>
          <label htmlFor="planType">Plan Type:</label>
          <select
            id="planType"
            value={formValues.plan_type}
            onChange={(event) =>
              setFormValues({ ...formValues, plan_type: event.target.value })
            }
          >
            <option value="basic">Basic</option>
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
          </select>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            value={formValues.expiration_date}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                expiration_date: event.target.value,
              })
            }
          />
          <label htmlFor="paymentMethod">Payment Method:</label>
          <input
            type="text"
            id="paymentMethod"
            value={formValues.payment_method}
            onChange={(event) =>
              setFormValues({
                ...formValues,
                payment_method: event.target.value,
              })
            }
          />
          <button type="submit">Save</button>
        </form>
      ) : (
        <>
          <h2>My Subscription</h2>
          <p>
            <strong>Plan Type:</strong> {subscription.plan_type}
          </p>
          <p>
            <strong>Expiration Date:</strong> {subscription.expiration_date}
          </p>
          <p>
            <strong>Payment Method:</strong> {subscription.payment_method}
          </p>
          <button onClick={() => setIsEditing(true)}>Edit Subscription</button>
        </>
      )}
    </div>
  );
}