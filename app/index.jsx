import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import React from "react";
import { useState } from "react";

const Index = () => {

  const [value, setValue] = useState("0");
  const [bracket, setBracket] = useState(false);

  const handlePress = (pressedValue) => {
    console.log("Pressed", pressedValue);
  
    setValue((prevValue) => {
      if (pressedValue === "AC") {
        return "0"; // Reset calculator
      }
  
      if (pressedValue === "Del") {
        return prevValue.length > 1 ? prevValue.slice(0, -1) : "0";
      }
  
      if (pressedValue === "=") {
        try {
          // Ensure parentheses are balanced before evaluating
          const openBrackets = (prevValue.match(/\(/g) || []).length;
          const closeBrackets = (prevValue.match(/\)/g) || []).length;
  
          if (openBrackets !== closeBrackets) {
            return "Syntax Error";
          }
          return eval(prevValue).toString(); // Evaluate safely
        } catch (error) {
          return "Syntax Error";
        }
      }
  
      if (pressedValue === "( )") {
        return prevValue + (bracket ? ")" : prevValue.slice(-1).match(/[0-9]/) ? "*(" : "(");
      }
  
      // ** Fix: Auto-insert `*` before `(` if previous character is a number
      if (pressedValue === "(" && prevValue.slice(-1).match(/[0-9]/)) {
        return prevValue + "*(";
      }
  
      // Prevent multiple operators in a row
      if (["+","-","*","/"].includes(pressedValue) && ["+","-","*","/"].includes(prevValue.slice(-1))) {
        return prevValue.slice(0, -1) + pressedValue;
      }
  
      // Replace "0" with a new number instead of appending
      if (prevValue === "0" && !isNaN(pressedValue)) {
        return pressedValue;
      }
  
      return prevValue + pressedValue;
    });
  
    if (pressedValue === "( )") {
      setBracket(!bracket); // Toggle bracket state
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.screen}>
          <Text style={styles.title}>Calculator</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a number"
            placeholderTextColor="#666"
          >{value}</TextInput>
          <View style={styles.keypad}>
            <Pressable onPress={() => handlePress("AC")}>
              <View style={styles.btn1_outter}>
                <Text style={styles.bg1_button}>AC</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("( )")}>
              <View style={styles.btn2_outter}>
                <Text style={styles.bg2_button}>( )</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("%")}>
              <View style={styles.btn3_outter}>
                <Text style={styles.bg3_button}>%</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("/")}>
              <View style={styles.btn4_outter}>
                <Text style={styles.bg4_button}>/</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.keypad}>
            <Pressable onPress={() => handlePress("7")}>
              <View style={styles.btn1_outter}>
                <Text style={styles.bg1_button}>7</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("8")}>
              <View style={styles.btn2_outter}>
                <Text style={styles.bg2_button}>8</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("9")}>
              <View style={styles.btn3_outter}>
                <Text style={styles.bg3_button}>9</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("*")}>
              <View style={styles.btn4_outter}>
                <Text style={styles.bg4_button}>*</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.keypad}>
            <Pressable onPress={() => handlePress("4")}>
              <View style={styles.btn1_outter}>
                <Text style={styles.bg1_button}>4</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("5")}>
              <View style={styles.btn2_outter}>
                <Text style={styles.bg2_button}>5</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("6")}>
              <View style={styles.btn3_outter}>
                <Text style={styles.bg3_button}>6</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("-")}>
              <View style={styles.btn4_outter}>
                <Text style={styles.bg4_button}>-</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.keypad}>
            <Pressable onPress={() => handlePress("1")}>
              <View style={styles.btn1_outter}>
                <Text style={styles.bg1_button}>1</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("2")}>
              <View style={styles.btn2_outter}>
                <Text style={styles.bg2_button}>2</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("3")}>
              <View style={styles.btn3_outter}>
                <Text style={styles.bg3_button}>3</Text>
              </View>
            </Pressable>
            <Pressable  onPress={() => handlePress("+")}>
              <View style={styles.btn4_outter}>
                <Text style={styles.bg4_button}>+</Text>
              </View>
            </Pressable>
          </View>
          <View style={styles.keypad}>
            <Pressable onPress={() => handlePress("Del")}>
              <View style={styles.btn1_outter}>
                <Text style={styles.bg1_button}>Del</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("0")}>
              <View style={styles.btn2_outter}>
                <Text style={styles.bg2_button}>0</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress(".")}>
              <View style={styles.btn3_outter}>
                <Text style={styles.bg3_button}>.</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => handlePress("=")}>
              <View style={styles.btn4_outter}>
                <Text style={styles.bg4_button}>=</Text>
              </View>
            </Pressable>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  screen: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingBottom: 20, // Added padding to avoid bottom overlap
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  input: {
    width: "90%",
    height: 120,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    textAlign: "right",
    marginBottom: 20,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  keypad: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    marginVertical: 5,
  },
  btn1_outter: {
    flex: 1,
    margin: 5,
    height: 75,
    width: 75,
    backgroundColor: "#666666", // Red for AC and other special buttons
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btn2_outter: {
    flex: 1,
    margin: 5,
    height: 75,
    width: 75,
    backgroundColor: "#666666", // Dark gray for parentheses and numbers
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btn3_outter: {
    flex: 1,
    margin: 5,
    height: 75,
    width: 75,
    backgroundColor: "#666666", // Same as numbers for consistency
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  btn4_outter: {
    flex: 1,
    margin: 5,
    height: 75,
    width: 75,
    backgroundColor: "#ffcc00", // Yellow for operators like +, -, /, *
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  bg1_button: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bg2_button: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bg3_button: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bg4_button: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black", // Black text for yellow buttons
  },
});
