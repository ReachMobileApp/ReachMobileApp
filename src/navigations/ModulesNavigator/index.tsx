import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ModuleScreen from "@/src/screens/Modules";
import QuizScreen from "@/src/screens/Quizes";

const ModulesNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
        name="Introduction"
        component={Introduction}
        options={{ headerShown: false }}
      /> */}
      <Stack.Screen
        name="Module"
        component={ModuleScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
      name="QuizScreen"
    component={QuizScreen}
    options={{ headerShown: false }} />
    
      {/* <Stack.Screen name="QuizScreen" component={QuizScreenOne} options={{ headerShown: false }} />  
      <Stack.Screen name="QuizScreenTwo" component={QuizScreenTwo} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenThree" component={QuizScreenThree} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenFour" component={QuizScreenFour} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenFive" component={QuizScreenFive} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenSix" component={QuizScreenSix} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenSeven" component={QuizScreenSeven} options={{ headerShown: false }} /> */}

    </Stack.Navigator>
  );
};

export default ModulesNavigator;
