# Missing Person Alert System (MissingLink)

This is a web application that allows users to broadcast missing person alerts and view alerts sent out previously by others. Users can also contact the person who posted the alert if they have any information about the missing person.

Live Demo is available at [https://amber-alerts.vercel.app/](https://amber-alerts.vercel.app/)

## Technologies Used

**NB:** This is a work in progress. The app is not fully functional yet and uses several experimental technologies. The app uses Next.js 13 Server Components and Server Actions, which are currently in experimental mode. The app also uses the Edge Runtime and [https://github.com/awinogrodzki/next-firebase-auth-edge/](next-firebase-auth-edge), which are also experimental. Will keep updating as they become stable.

- Next.js 13 Server Components and Server Actions
- Edge Runtime (Some Parts of the App)
- Firebase Authentication
- Firestore
- Firebase Cloud Messaging
- GeoLocation API
- Twilio Phone Verification API

## Features (Work In Progress)

1. **Posting Alerts:** Logged in users can send out missing person alerts to all nearby users.
2. **Report Sightings:** Logged in users can report when they see a missing person whose alert has ben broadcasted through the platform.
3. **Viewing Alerts:** Anyone can view the alerts posted on the app. They can filter the alerts based on location and date.
4. **Contacting Alert Poster:** If a user has any information about the missing person, they can contact the person who posted the alert through the app.
5. **Notifications:** Users can receive notifications about new missing person alerts based on their location.
6. **Location-based Alerts:** Users can post alerts with location details, and the app can notify users within a certain radius of the missing person's last known location.
7. **Search Functionality:** Users can search for missing person alerts based on keywords and other criteria.
8. **Admin Dashboard:** Admin can access a dashboard to manage user accounts and remove any inappropriate content.
9. **Translation:** Translation functionality to enable users to post alerts and view alerts in different languages.
10. **Analytics:** Use analytics tools to analyze user behavior and improve the app's functionality.
11. **Integration with Social Media:** Allow users to share alerts on social media platforms.
12. **PWA Functionality:** Enable PWA functionality to allow users to install the app on their devices so it can function as a native app.
