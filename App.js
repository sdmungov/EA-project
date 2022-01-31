/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import teamData from "./data/teamsInfo.json";

const { height } = Dimensions.get("window");

const App = () => {
  const [teamName, setTeamName] = useState("");
  const [teamCity, setTeamCity] = useState("");
  const [playersArr, setPlayersArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState();
  const [center, setCenter] = useState(null);
  const [powerForward, setPowerForward] = useState(null);
  const [smallForward, setSmallForward] = useState(null);
  const [pointGuard, setPointGuard] = useState(null);
  const [shootingGuard, setShootingGuard] = useState(null);

  const updateTeam = (key) => {
    switch (key) {
      case "Center":
        setCenter(currentPlayer);
        break;
      case "Power Forward":
        setPowerForward(currentPlayer);
        break;
      case "Small Forward":
        setSmallForward(currentPlayer);
        break;
      case "Point Guard":
        setPointGuard(currentPlayer);
        break;
      case "Shooting Guard":
        setShootingGuard(currentPlayer);
        break;
      default:
        break;
    }
  };

  const AddPlayerModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          {options.map((option, index) => {
            return (
              <TouchableOpacity
                style={styles.posOptionCard}
                key={index}
                onPress={() => {
                  updateTeam(option);
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
        </View>
      </Modal>
    );
  };

  const getPlayersFromApi = async () => {
    try {
      await fetch("https://data.nba.net/10s/prod/v1/2021/players.json")
        .then((response) => response.json())
        .then((jsonData) => {
          const playerData = jsonData.league;
          let dataArr = [];
          const keys = Object.keys(playerData);
          keys.forEach((key) => {
            dataArr.push(playerData[key]);
          });
          let uniquePlayers = [
            ...new Map(
              dataArr.flat(1).map((item) => [item["personId"], item])
            ).values(),
          ];
          setPlayersArr(uniquePlayers);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPlayersFromApi();
  }, []);

  const EmptyCard = ({ positionTitle }) => {
    return (
      <View
        style={[styles.playerCard, { padding: 16, justifyContent: "center" }]}
      >
        <View style={{ width: "50%" }}>
          <Text
            style={[
              styles.playerCardText,
              {
                fontSize: 12,
                fontWeight: "500",
                textAlign: "center",
              },
            ]}
          >
            No {positionTitle} selected, choose a {positionTitle} from available
            players below
          </Text>
        </View>
      </View>
    );
  };

  const PlayerCard = ({ item, action, posKey }) => {
    const playerPic = `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${item.personId}.png`;

    const retrieveTeamName = (teamId) => {
      let teamName;
      teamData.map((team) => {
        if (team["teamId"] == teamId) {
          teamName = team["teamName"];
        }
      });
      return teamName;
    };

    const handleAdd = (position, player) => {
      let posOptions = [];
      if (position.includes("F")) {
        posOptions.push("Power Forward", "Small Forward");
      }
      if (position.includes("C")) {
        posOptions.push("Center");
      }
      if (position.includes("G")) {
        posOptions.push("Point Guard", "Shooting Guard");
      }
      setOptions(posOptions);
      setModalVisible(true);
      setCurrentPlayer(player);
    };

    const handleRemove = (key) => {
      switch (key) {
        case "Center":
          setCenter(null);
          break;
        case "Power Forward":
          setPowerForward(null);
          break;
        case "Small Forward":
          setSmallForward(null);
          break;
        case "Point Guard":
          setPointGuard(null);
          break;
        case "Shooting Guard":
          setShootingGuard(null);
          break;
        default:
          break;
      }
    };

    return (
      <View style={styles.playerCard}>
        <Image
          source={{ uri: playerPic }}
          style={styles.playerCardImage}
          resizeMode="contain"
        />
        <View style={{ width: "50%" }}>
          <Text
            style={[
              styles.playerCardText,
              { fontSize: 18, fontWeight: "bold" },
            ]}
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
            action === "Add" ? handleAdd(item.pos, item) : handleRemove(posKey)
          }
        >
          <Text style={styles.addButtonText}>{action}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.outerWrapper}>
      <AddPlayerModal />
      <SafeAreaView style={styles.innerWrapper} />
      <ScrollView
        nestedScrollEnabled={true}
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.header}>New Team</Text>
        <View style={styles.inputRows}>
          <Text style={styles.teamDetailsInput}>Team Name:</Text>
          <TextInput
            style={styles.teamDetailsInputText}
            onChangeText={setTeamName}
            value={teamName}
          />
        </View>
        <View style={styles.inputRows}>
          <Text style={styles.teamDetailsInput}>Team City:</Text>
          <TextInput
            style={styles.teamDetailsInputText}
            onChangeText={setTeamCity}
            value={teamCity}
          />
        </View>
        <Text style={styles.instructions}>
          Add players to your roster to fill the required positions.
        </Text>
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>My Team:</Text>
        <Text style={styles.positionTitle}>- Center -</Text>
        {center ? (
          <PlayerCard item={center} action="Remove" posKey="Center" />
        ) : (
          <EmptyCard positionTitle="Center" />
        )}
        <Text style={styles.positionTitle}>- Power Forward -</Text>
        {powerForward ? (
          <PlayerCard
            item={powerForward}
            action="Remove"
            posKey="Power Forward"
          />
        ) : (
          <EmptyCard positionTitle="Power Forward" />
        )}
        <Text style={styles.positionTitle}>- Small Forward -</Text>
        {smallForward ? (
          <PlayerCard
            item={smallForward}
            action="Remove"
            posKey="Small Forward"
          />
        ) : (
          <EmptyCard positionTitle="Small Forward" />
        )}
        <Text style={styles.positionTitle}>- Point Guard -</Text>
        {pointGuard ? (
          <PlayerCard item={pointGuard} action="Remove" posKey="Point Guard" />
        ) : (
          <EmptyCard positionTitle="Point Guard" />
        )}
        <Text style={styles.positionTitle}>- Shooting Guard -</Text>
        {shootingGuard ? (
          <PlayerCard
            item={shootingGuard}
            action="Remove"
            posKey="Shooting Guard"
          />
        ) : (
          <EmptyCard positionTitle="Shooting Guard" />
        )}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Players Available:</Text>
        {!loading && (
          <FlatList
            style={styles.playerList}
            data={playersArr}
            renderItem={({ item }) => <PlayerCard item={item} action="Add" />}
            keyExtractor={(item) => `${item.personId}`}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  outerWrapper: {
    backgroundColor: "white",
    flex: 1,
  },
  innerWrapper: {
    backgroundColor: "transparent",
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    marginVertical: 16,
    fontSize: 48,
    fontWeight: "bold",
  },
  instructions: {
    marginVertical: 8,
    fontSize: 16,
    fontWeight: "500",
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 24,
    width: "85%",
    alignSelf: "center",
  },
  positionTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 16,
  },
  playerList: {
    height: height,
  },
  playerCard: {
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  posOptionCard: {
    width: "65%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  playerCardImage: {
    width: "25%",
    height: 50,
  },
  playerCardText: {
    fontSize: 14,
    fontWeight: "500",
  },
  addButton: {
    width: "20%",
    height: 35,
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 12,
    fontWeight: "bold",
    alignSelf: "center",
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
  },
  teamDetailsInput: {
    fontSize: 24,
    fontWeight: "bold",
  },
  teamDetailsInputText: {
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 8,
  },
  playerList: {
    height: 500,
  },
});

export default App;
