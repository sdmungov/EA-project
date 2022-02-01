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
  const [center, setCenter] = useState([]);
  const [powerForward, setPowerForward] = useState([]);
  const [smallForward, setSmallForward] = useState([]);
  const [pointGuard, setPointGuard] = useState([]);
  const [shootingGuard, setShootingGuard] = useState([]);
  const [centerFilter, setCenterFilter] = useState(true);
  const [forwardFilter, setForwardFilter] = useState(true);
  const [guardFilter, setGuardFilter] = useState(true);

  const filteredPlayers = playersArr.filter((player) => {
    const isC = center.filter((c) => c.personId === player.personId).length > 0;
    const isPF =
      powerForward.filter((pf) => pf.personId === player.personId).length > 0;
    const isSF =
      smallForward.filter((sf) => sf.personId === player.personId).length > 0;
    const isPG =
      pointGuard.filter((pg) => pg.personId === player.personId).length > 0;
    const isSG =
      shootingGuard.filter((sg) => sg.personId === player.personId).length > 0;
    const notOnTeam = !isC && !isPF && !isSF && !isPG && !isSG;
    let isCenter;
    let isForward;
    let isGuard;
    if (centerFilter) {
      isCenter = player.pos.includes("C");
    }
    if (forwardFilter) {
      isForward = player.pos.includes("F");
    }
    if (guardFilter) {
      isGuard = player.pos.includes("G");
    }
    const positionFiltered = isCenter || isForward || isGuard;
    return notOnTeam && positionFiltered;
  });

  const updateTeam = (key) => {
    switch (key) {
      case "Center":
        setCenter([...center, currentPlayer]);
        break;
      case "Power Forward":
        setPowerForward([...powerForward, currentPlayer]);
        break;
      case "Small Forward":
        setSmallForward([...smallForward, currentPlayer]);
        break;
      case "Point Guard":
        setPointGuard([...pointGuard, currentPlayer]);
        break;
      case "Shooting Guard":
        setShootingGuard([...shootingGuard, currentPlayer]);
        break;
      default:
        break;
    }
  };

  const AddPlayerModal = () => {
    return (
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modal}>
          <Text style={[styles.instructions, { width: "85%" }]}>
            Which position do you want to assign to {currentPlayer?.firstName}{" "}
            {currentPlayer?.lastName}?
          </Text>
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
            No {positionTitle}s selected, choose a {positionTitle} from
            available players below
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

    const handleRemove = (personId, key) => {
      switch (key) {
        case "Center":
          const filteredCenter = center.filter((player) => {
            return player.personId !== personId;
          });
          setCenter(filteredCenter);
          break;
        case "Power Forward":
          const filteredPowerForward = powerForward.filter((player) => {
            return player.personId !== personId;
          });
          setPowerForward(filteredPowerForward);
          break;
        case "Small Forward":
          const filteredSmallForward = smallForward.filter((player) => {
            return player.personId !== personId;
          });
          setSmallForward(filteredSmallForward);
          break;
        case "Point Guard":
          const filteredPointGuard = pointGuard.filter((player) => {
            return player.personId !== personId;
          });
          setPointGuard(filteredPointGuard);
          break;
        case "Shooting Guard":
          const filteredShootingGuard = shootingGuard.filter((player) => {
            return player.personId !== personId;
          });
          setShootingGuard(filteredShootingGuard);
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
            action === "Add"
              ? handleAdd(item.pos, item)
              : handleRemove(item.personId, posKey)
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
        <Text style={styles.header}>Team Builder</Text>
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
        <Text style={styles.sectionTitle}>- My Team -</Text>
        <Text style={styles.positionTitle}>Centers:</Text>
        {center.length ? (
          center.map((player) => {
            return (
              <PlayerCard
                item={player}
                action="Remove"
                posKey="Center"
                key={player.personId}
              />
            );
          })
        ) : (
          <EmptyCard positionTitle="Center" />
        )}
        <Text style={styles.positionTitle}>Power Forwards:</Text>
        {powerForward.length ? (
          powerForward.map((player) => {
            return (
              <PlayerCard
                item={player}
                action="Remove"
                posKey="Power Forward"
                key={player.personId}
              />
            );
          })
        ) : (
          <EmptyCard positionTitle="Power Forward" />
        )}
        <Text style={styles.positionTitle}>Small Forwards:</Text>
        {smallForward.length ? (
          smallForward.map((player) => {
            return (
              <PlayerCard
                item={player}
                action="Remove"
                posKey="Small Forward"
                key={player.personId}
              />
            );
          })
        ) : (
          <EmptyCard positionTitle="Small Forward" />
        )}
        <Text style={styles.positionTitle}>Point Guards:</Text>
        {pointGuard.length ? (
          pointGuard.map((player) => {
            return (
              <PlayerCard
                item={player}
                action="Remove"
                posKey="Point Guard"
                key={player.personId}
              />
            );
          })
        ) : (
          <EmptyCard positionTitle="Point Guard" />
        )}
        <Text style={styles.positionTitle}>Shooting Guards:</Text>
        {shootingGuard.length ? (
          shootingGuard.map((player) => {
            return (
              <PlayerCard
                item={player}
                action="Remove"
                posKey="Shooting Guard"
                key={player.personId}
              />
            );
          })
        ) : (
          <EmptyCard positionTitle="Shooting Guard" />
        )}
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>- Players Available -</Text>
        <View style={styles.filterContainer}>
          <Text>Filter by Position:</Text>
          <View style={styles.filterGroup}>
            <TouchableOpacity
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              style={[
                styles.checkbox,
                { backgroundColor: centerFilter ? "blue" : "transparent" },
              ]}
              onPress={() => setCenterFilter(!centerFilter)}
            />
            <Text style={styles.filterText}>Center</Text>
          </View>
          <View style={styles.filterGroup}>
            <TouchableOpacity
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              style={[
                styles.checkbox,
                { backgroundColor: forwardFilter ? "blue" : "transparent" },
              ]}
              onPress={() => setForwardFilter(!forwardFilter)}
            />
            <Text style={styles.filterText}>Forward</Text>
          </View>
          <View style={styles.filterGroup}>
            <TouchableOpacity
              hitSlop={{ top: 16, bottom: 16, left: 16, right: 16 }}
              style={[
                styles.checkbox,
                { backgroundColor: guardFilter ? "blue" : "transparent" },
              ]}
              onPress={() => setGuardFilter(!guardFilter)}
            />
            <Text style={styles.filterText}>Guard</Text>
          </View>
        </View>
        {!loading && (
          <FlatList
            style={styles.playerList}
            data={filteredPlayers}
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
    textAlign: "center",
    alignSelf: "center",
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 24,
    width: "85%",
    alignSelf: "center",
  },
  positionTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  sectionTitle: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 24,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  filterGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 4,
  },
  checkbox: {
    height: 16,
    width: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "blue",
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
