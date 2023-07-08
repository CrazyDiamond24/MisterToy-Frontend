<!-- <template>
  <div id="signup-page">
    <img src="spotify-logo.svg" alt="Spotify Logo" />
    <h1>Sign up for free to start listening.</h1>

    <button>Sign up with Facebook</button>
    <button>Sign up with Google</button>

    <div class="separator">
      <span>or</span>
    </div>

    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="email">What's your email?</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <div class="form-group">
        <label for="confirm-email">Confirm your email</label>
        <input
          type="email"
          id="confirm-email"
          v-model="confirmEmail"
          placeholder="Enter your email again"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Create a password</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Create a password"
          required
        />
      </div>

      <div class="form-group">
        <label for="display-name">What should we call you?</label>
        <input
          type="text"
          id="display-name"
          v-model="displayName"
          placeholder="Enter a display name"
          required
        />
        <small>This appears on your profile.</small>
      </div>

      <div class="form-group">
        <label for="birthdate">What's your date of birth?</label>
        <div>
          <input
            type="number"
            id="day"
            v-model="day"
            min="1"
            max="31"
            placeholder="DD"
            required
          />
          <input
            type="number"
            id="month"
            v-model="month"
            min="1"
            max="12"
            placeholder="MM"
            required
          />
          <input
            type="number"
            id="year"
            v-model="year"
            min="1900"
            max="2022"
            placeholder="YYYY"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <label>What's your gender?</label>
        <div>
          <input type="radio" id="male" value="male" v-model="gender" />
          <label for="male">Male</label>
        </div>
        <div>
          <input type="radio" id="female" value="female" v-model="gender" />
          <label for="female">Female</label>
        </div>
        <div>
          <input
            type="radio"
            id="non-binary"
            value="non-binary"
            v-model="gender"
          />
          <label for="non-binary">Non-binary</label>
        </div>
        <div>
          <input type="radio" id="other" value="other" v-model="gender" />
          <label for="other">Other</label>
        </div>
        <div>
          <input
            type="radio"
            id="prefer-not-to-say"
            value="prefer-not-to-say"
            v-model="gender"
          />
          <label for="prefer-not-to-say">Prefer not to say</label>
        </div>
      </div>

      <div class="form-group">
        <input type="checkbox" id="news-and-offers" v-model="newsAndOffers" />
        <label for="news-and-offers"
          >Please send me news and offers from Spotify</label
        >
      </div>

      <div class="form-group">
        <input
          type="checkbox"
          id="share-registration-data"
          v-model="shareRegistrationData"
        />
        <label for="share-registration-data"
          >Share my registration data with Spotify's content providers for
          marketing purposes.</label
        >
      </div>

      <div class="form-group">
        <input type="checkbox" id="agree-terms" v-model="agreeTerms" required />
        <label for="agree-terms">
          By clicking on sign-up, you agree to
          <a href="#" class="terms-link"
            >Spotify's Terms and Conditions of Use</a
          >.
        </label>
      </div>

      <div class="form-group">
        <p>
          To learn more about how Spotify collects, uses, shares and protects
          your personal data, please see
          <a href="#" class="privacy-policy-link">Spotify's Privacy Policy</a>.
        </p>
      </div>

      <button type="submit">Sign up</button>
    </form>

    <div class="login-link">
      Have an account?
      <a href="#">Log in</a>.
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      confirmEmail: '',
      password: '',
      displayName: '',
      day: '',
      month: '',
      year: '',
      gender: '',
      newsAndOffers: false,
      shareRegistrationData: false,
      agreeTerms: false,
    }
  },
  methods: {
    submitForm() {
      // Validate and submit the form here
      console.log('Form submitted')
    },
  },
}
</script> -->

<template>
  <section class="login-signup">
    <h3>Login/Signup</h3>
    <form @submit.prevent="login">
      <h2>Login</h2>
      <input
        type="text"
        v-model="credentials.username"
        placeholder="Username"
      />
      <input
        type="password"
        v-model="credentials.password"
        placeholder="Password"
      />
    
      <button>Login</button>

    </form>
    <hr />
    <form @submit.prevent="signup">
      <h2>Signup</h2>
      <input
        type="text"
        v-model="signupInfo.fullname"
        placeholder="Full name"
      />
      <input type="text" v-model="signupInfo.username" placeholder="Username" />
      <input
        type="password"
        v-model="signupInfo.password"
        placeholder="Password"
      />
      <button>Signup</button>
    </form>
  </section>
</template>

<script>
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import router from '../router'
export default {
  name: 'LoginSignup',

  data() {
    return {
      credentials: {
        username: 'puki',
        password: '123',
      },
      signupInfo: {
        fullname: '',
        username: '',
        password: '',
      },
    }
  },
  methods: {

    login() {
  console.log('hi')
  this.$store
    .dispatch({ type: 'login', credentials: this.credentials })
    .then(() => {
      console.log('cmps ', this.credentials)
      // showSuccessMsg('user login')
      router.push('/toy'); // Navigate to /toy route
    })
    .catch((err) => {
      showErrorMsg('Cannot login')
    })
},

    signup() {
      console.log('alo')
      this.$store
        .dispatch({ type: 'signup', credentials: this.signupInfo })
        .then(() => {
          // showSuccessMsg('user signup')
        })
        .catch((err) => {
          // showErrorMsg('Cannot sign up')
        })
    },
  },
}
</script>
