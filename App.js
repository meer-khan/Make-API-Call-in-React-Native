import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TouchableHighlight,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

// Drawer
const Drawer = createDrawerNavigator();
// 4 Screens in Drawer
function DrawerRoute() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="User" component={User} />
      <Drawer.Screen name="Tasks" component={Tasks} />
      <Drawer.Screen name="Album" component={Album} />
    </Drawer.Navigator>
  );
}

// Stack Navigation

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="DrawerRoute" component={DrawerRoute} />
        <Stack.Screen name="User" component={User} />
        <Stack.Screen name="UserDetail" component={UserDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//

// User Screen
function User({ navigation }) {
  function UserCard({ userID, userName, userPh, userCompany }) {
    return (
      <View
        style={{
          borderWidth: 1,
          borderBottomColor: "grey",
          borderTopColor: "#355070",
          borderLeftColor: "#355070",
          borderRightColor: "#355070",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UserDetail", {
              userID: userID,
              userName: userName,
              userPh: userPh,
              userObj: userCompany,
            });
          }}
          style={{
            height: 50,
            width: 300,
            justifyContent: "center",
            elevation: 4.0,
          }}
        >
          <Text
            style={{
              fontWeight: "500",
              fontSize: 20,
              color: "white",
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: "#ecf8f8",
            }}
          >
            {userPh}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Calling API

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // console.log(data)
  }, []);

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#355070" }}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => {
            return (
              <View>
                <UserCard
                  userID={item.id}
                  userName={item.name}
                  userPh={item.phone}
                  userCompany={item}
                ></UserCard>
              </View>
            );
          }}
        />
      )}
    </View>
  );
}

// User Detail SCreen
function UserDetail({ route, navigation }) {
  const userID = route.params;
  const userName = route.params;
  const userPh = route.params;
  const userCompany = route.params.userObj;
  console.log("_---------");
  console.log(userCompany.company.name);
  console.log("_---------");
  return (
    
    <View style={styles.container}>
      <Text style={{fontSize:30 , fontWeight:'bold', color:'#3d5a80'}}>
     USER DETAILS
   
   </Text>
 
     
      <View
        style={{
          backgroundColor: "#457b9d",
          margin: 8,
          width: "90%",
          height: 110,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 2,
          borderColor: "#a8dadc",
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 35,
              color: "white",
              marginTop: 22,
            }}
          >
            {userName.userName} {"\n"}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            backgroundColor: "#52b788",
            margin: 8,
            width: "43%",
            height: 110,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#74c69d",
          }}
        >
          <Text style={styles.btntext}>
            Phone {"\n"}
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#073b4c" }}
            >
              {userPh.userPh}
            </Text>
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#52b788",
            margin: 8,
            width: "43%",
            height: 110,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 2,
            borderColor: "#74c69d",
          }}
        >
          <Text style={styles.btntext}>
            Company {"\n"}
            <Text
              style={{ fontWeight: "bold", fontSize: 20, color: "#4361ee" }}
            >
              {userCompany.company.name}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

function Tasks({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
       <Text>THIS IS TASKS</Text>
    </View>
  );
}

function Album({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>THIS IS ALBUM</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#98c1d9",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#52b788",
    margin: 8,
    width: "43%",
    height: 110,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#74c69d",
  },
  btntext: {
    color: "white",
    fontSize: 18,
  },
});
