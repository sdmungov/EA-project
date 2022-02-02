import teamData from "../data/teamsInfo.json";

export const retrieveTeamName = (teamId) => {
  let teamName;
  teamData.map((team) => {
    if (team["teamId"] == teamId) {
      teamName = team["teamName"];
    }
  });
  return teamName;
};

export const handleAdd = (
  position,
  player,
  setOptions,
  setModalVisible,
  setCurrentPlayer
) => {
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

export const handleRemove = (
  personId,
  key,
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
) => {
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

export const handlePlayerFilter = (
  player,
  c,
  pf,
  sf,
  pg,
  sg,
  cFilter,
  fFilter,
  gFilter
) => {
  const isC = c.filter((c) => c.personId === player.personId).length > 0;
  const isPF = pf.filter((pf) => pf.personId === player.personId).length > 0;
  const isSF = sf.filter((sf) => sf.personId === player.personId).length > 0;
  const isPG = pg.filter((pg) => pg.personId === player.personId).length > 0;
  const isSG = sg.filter((sg) => sg.personId === player.personId).length > 0;
  const notOnTeam = !isC && !isPF && !isSF && !isPG && !isSG;
  let isCenter;
  let isForward;
  let isGuard;
  if (cFilter) {
    isCenter = player.pos.includes("C");
  }
  if (fFilter) {
    isForward = player.pos.includes("F");
  }
  if (gFilter) {
    isGuard = player.pos.includes("G");
  }
  const positionFiltered = isCenter || isForward || isGuard;
  return notOnTeam && positionFiltered;
};

export const updateTeam = (
  key,
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
) => {
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

export const getPlayersFromApi = async (setPlayersArr, setLoading) => {
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
