import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { retrieveTeamName, handleAdd, handleRemove } from "../utils";
import { styles } from "../styles";

const PlayerCard = ({
  item,
  action,
  posKey,
  setOptions,
  setModalVisible,
  setCurrentPlayer,
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
  const playerPic = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${item.personId}.png`;

  return (
    <View style={styles.playerCard}>
      <Image
        source={{ uri: playerPic }}
        style={styles.playerCardImage}
        resizeMode="contain"
      />
      <View style={{ width: "50%" }}>
        <Text
          style={[styles.playerCardText, { fontSize: 18, fontWeight: "bold" }]}
        >
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.playerCardText}>
          {item.pos} | {retrieveTeamName(item.teamId)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          action === "Add"
            ? handleAdd(
                item.pos,
                item,
                setOptions,
                setModalVisible,
                setCurrentPlayer
              )
            : handleRemove(
                item.personId,
                posKey,
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
              )
        }
      >
        <Text style={styles.addButtonText}>{action}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlayerCard;
