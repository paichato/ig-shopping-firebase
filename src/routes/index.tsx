import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppRoutes } from "./app.routes";
import { SignIn } from "../screens/SignIn";
import auth from "@react-native-firebase/auth";

type User = {
  uid: string;
};

export function Routes() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((userInfo) => {
      console.log(userInfo);

      setUser(userInfo);
    });

    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
