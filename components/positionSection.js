import React from "react";
import { Text, View } from "react-native";
import EmptyPlayerCard from "./emptyPlayerCard";
import PlayerCard from "./playerCard";
import { styles } from "../styles";

const PositionSection = ({
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
  const positions = [
    "Center",
    "Power Forward",
    "Small Forward",
    "Point Guard",
    "Shooting Guard",
  ];

  return (
    <>
      {positions.map((position, index) => {
        let arr;
        switch (position) {
          case "Center":
            arr = center;
            break;
          case "Power Forward":
            arr = powerForward;
            break;
          case "Small Forward":
            arr = smallForward;
            break;
          case "Point Guard":
            arr = pointGuard;
            break;
          case "Shooting Guard":
            arr = shootingGuard;
            break;
          default:
            break;
        }
        return (
          <View key={index}>
            <Text style={styles.positionTitle}>{position}s:</Text>
            {arr.length ? (
              arr.map((player) => {
                return (
                  <PlayerCard
                    item={player}
                    action="Remove"
                    posKey={position}
                    key={player.personId}
                    setOptions={setOptions}
                    setModalVisible={setModalVisible}
                    setCurrentPlayer={setCurrentPlayer}
                    center={center}
                    setCenter={setCenter}
                    powerForward={powerForward}
                    setPowerForward={setPowerForward}
                    smallForward={smallForward}
                    setSmallForward={setSmallForward}
                    pointGuard={pointGuard}
                    setPointGuard={setPointGuard}
                    shootingGuard={shootingGuard}
                    setShootingGuard={setShootingGuard}
                  />
                );
              })
            ) : (
              <EmptyPlayerCard positionTitle={position} />
            )}
          </View>
        );
      })}
    </>
  );
};

export default PositionSection;
