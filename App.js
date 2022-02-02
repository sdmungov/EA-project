/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import PositionModal from "./components/positionModal";
import PlayerCard from "./components/playerCard";
import PositionSection from "./components/positionSection";
import FilterSection from "./components/filterSection";
import { handlePlayerFilter, getPlayersFromApi } from "./utils";
import { styles } from "./styles";

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
    return handlePlayerFilter(
      player,
      center,
      powerForward,
      smallForward,
      pointGuard,
      shootingGuard,
      centerFilter,
      forwardFilter,
      guardFilter
    );
  });

  useEffect(() => {
    getPlayersFromApi(setPlayersArr, setLoading);
  }, []);

  return (
    <View style={styles.outerWrapper}>
      <PositionModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        currentPlayer={currentPlayer}
        setCurrentPlayer={setCurrentPlayer}
        options={options}
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
        <PositionSection
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
        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>- Players Available -</Text>
        <FilterSection
          centerFilter={centerFilter}
          setCenterFilter={setCenterFilter}
          forwardFilter={forwardFilter}
          setForwardFilter={setForwardFilter}
          guardFilter={guardFilter}
          setGuardFilter={setGuardFilter}
        />
        {!loading && (
          <FlatList
            style={styles.playerList}
            data={filteredPlayers}
            renderItem={({ item }) => (
              <PlayerCard
                item={item}
                action="Add"
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
            )}
            keyExtractor={(item) => `${item.personId}`}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default App;
