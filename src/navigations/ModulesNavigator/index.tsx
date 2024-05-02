import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Introduction from "@/src/screens/Modules/Introduction";
import ModuleOne from "@/src/screens/Modules/One";
import ModuleTwo from "@/src/screens/Modules/Two";
import ModuleThree from "@/src/screens/Modules/Three";
import ModuleFour from "@/src/screens/Modules/Four";
import ModuleFive from "@/src/screens/Modules/Five";
import ModuleSix from "@/src/screens/Modules/Six";
import ModuleSeven from "@/src/screens/Modules/Seven";
import QuizScreenOne from "@/src/screens/Quizes/One";
import QuizScreenTwo from "@/src/screens/Quizes/Two";
import QuizScreenThree from "@/src/screens/Quizes/Three";
import QuizScreenFour from "@/src/screens/Quizes/Four";
import QuizScreenFive from "@/src/screens/Quizes/Five";
import QuizScreenSix from "@/src/screens/Quizes/Six";
import QuizScreenSeven from "@/src/screens/Quizes/Seven";

const ModulesNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Introduction"
        component={Introduction}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleOne"
        component={ModuleOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleTwo"
        component={ModuleTwo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleThree"
        component={ModuleThree}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleFour"
        component={ModuleFour}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleFive"
        component={ModuleFive}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleSix"
        component={ModuleSix}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModuleSeven"
        component={ModuleSeven}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="QuizScreenOne" component={QuizScreenOne} options={{ headerShown: false }} />  
      <Stack.Screen name="QuizScreenTwo" component={QuizScreenTwo} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenThree" component={QuizScreenThree} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenFour" component={QuizScreenFour} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenFive" component={QuizScreenFive} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenSix" component={QuizScreenSix} options={{ headerShown: false }} />
      <Stack.Screen name="QuizScreenSeven" component={QuizScreenSeven} options={{ headerShown: false }} />

    </Stack.Navigator>
  );
};

export default ModulesNavigator;
