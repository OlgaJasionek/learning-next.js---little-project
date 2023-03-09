import { useContext, useRef } from "react";
import NotificationContext from "../../../../store/notifications-context";
import styles from "./newsletter.module.scss";

const NewsletterRegistration = () => {
  const emailInput = useRef<HTMLInputElement>(null);
  const notificationCtx = useContext(NotificationContext);

  const registrationHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredEmail = emailInput.current?.value;

    notificationCtx.showNotification({
      title: "Sigining up ...",
      status: "pending",
      message: "Registering for newaletter",
    });

    fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then(data => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then(data => {
        notificationCtx.showNotification({
          title: " Success!",
          status: "success",
          message: "Successfully registered for newsletter",
        });
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: " Error!",
          status: error.message || "Something went wrong!",
          message: "error",
        });
      });
  };

  return (
    <section className={styles.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={styles.control}>
          <input
            ref={emailInput}
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
};

export default NewsletterRegistration;
