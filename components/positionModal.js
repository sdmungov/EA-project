import React from "react";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { updateTeam } from "../utils";
import { styles } from "../styles";

const PositionModal = ({
  modalVisible,
  setModalVisible,
  currentPlayer,
  setCurrentPlayer,
  options,
  center,
  setCenter,
  powerForward,
  setPowerForward,
  smallForward,
  setSmallForward,
  pointGuard,
  setPointGuard,
  shootingGuard,
  setShootingGuard,
}) => {
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={styles.modal}>
        <Text style={[styles.instructions, { width: "85%" }]}>
          Which position do you want to assign to {currentPlayer?.firstName}{" "}
          {currentPlayer?.lastName}?
        </Text>
        {options?.map((option, index) => {
          return (
            <TouchableOpacity
              style={styles.posOptionCard}
              key={index}
              onPress={() => {
                updateTeam(
                  option,
                  currentPlayer,
                  center,
                  setCenter,
                  powerForward,
                  setPowerForward,
                  smallForward,
                  setSmallForward,
                  pointGuard,
                  setPointGuard,
                  shootingGuard,
                  setShootingGuard
                );
                setCurrentPlayer(null);
                setModalVisible(false);
              }}
            >
              <Text
                style={[
                  styles.playerCardText,
                  { fontSize: 18, fontWeight: "bold" },
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
        <TouchableOpacity
          style={[
            styles.posOptionCard,
            { borderColor: "red", borderWidth: 0, backgroundColor: "red" },
          ]}
          key={"cancel"}
          onPress={() => {
            setModalVisible(false);
          }}
        >
          <Text
            style={[
              styles.playerCardText,
              { fontSize: 18, fontWeight: "bold", color: "white" },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default PositionModal;
