import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get("window");

export const styles = StyleSheet.create({
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
    fontSize: 28,
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
    fontSize: 20,
    fontWeight: "bold",
  },
  teamDetailsInputText: {
    borderBottomWidth: 1,
    flex: 1,
    marginLeft: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  playerList: {
    height: 500,
  },
});
