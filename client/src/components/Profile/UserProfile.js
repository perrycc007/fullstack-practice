import SignupForm from './Form/SignupForm';
import classes from './UserProfile.module.css';
const UserProfile = () => {
  return (
    <section className={classes.card}>
      <h1>Your User Profile</h1>
      <SignupForm />
    </section>
  );
};

export default UserProfile;
