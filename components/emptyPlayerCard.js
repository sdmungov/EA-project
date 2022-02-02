import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles";

const EmptyPlayerCard = ({ positionTitle }) => {
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
          No {positionTitle}s selected, choose a {positionTitle} from available
          players below
        </Text>
      </View>
    </View>
  );
};

export default EmptyPlayerCard;
