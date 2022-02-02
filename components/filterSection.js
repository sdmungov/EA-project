import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { styles } from "../styles";

const FilterSection = ({
  centerFilter,
  setCenterFilter,
  forwardFilter,
  setForwardFilter,
  guardFilter,
  setGuardFilter,
}) => {
  return (
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
  );
};

export default FilterSection;
