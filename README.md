# ContactsApp
# Key packages
  Demo video: https://youtu.be/jffcJjWx3AA
  - react-native-contacts (to handle permissions and get contacts info )
  - react-native-status-bar-height (handle statusbar height on different devices)
  - react-native-vector-icons (allow us to use Icons on components)
  - react-navigation (for navigation)
  - realmDB ->
        - to get the pass of database on device simulator use this code {console.log(Realm.defaultPath)} 
        you can easily access the database using realm studio
        * there is 2 tables on database 
            - users : [userId,userName,passWord]
            - friends : [userName,name,mobile,email]
            
    - sorry for login ui screen, didn't find anytime to make it more pretty.
