import {useIntegration} from '@tma.js/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initNavigator, useInitData, useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
} from '@tma.js/sdk-react';
import {AppRoot} from '@telegram-apps/telegram-ui';
import {type FC, useEffect, useMemo, useRef, useState} from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import {NextUIProvider} from "@nextui-org/react";
import {IndexPage} from "@/pages/IndexPage/IndexPage.tsx";
import useWebSocket from "react-use-websocket";
import {BoostsPage} from "@/pages/boostsPage";


export const App: FC = () => {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.
  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);



  // const CloudStorage = useCloudStorage()

  // useStates
  // const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);
  // const [initDataUnsafe] = useInitData();
  // const telegramUserId = initDataUnsafe?.user?.id;
  // const telegramUserId = 123456;

  /********************user balance ******************/
  const [fromBalance, setFromBalance] = useState<number>(0);
  const [userBalance, setUserBalance] = useState<number>(0);

  /********************user trophy ******************/

  const [userTrophy, setUserTrophy] = useState<number>(0);
  const [userTotalAmount, setUserTotalAmount] = useState<number>(0);

  /********************Tap page *********************/
  const [userLevel, setUserLevel] = useState<number>(0);
  const [maxEnergyLimit, setMaxEnergyLimit] = useState<number>(0);
  const [guru, setGuru] = useState<boolean>(false);
  const [autoBot, setAutoBot] = useState<boolean>(false);
  const [currentEnergy, setCurrentEnergy] = useState<number>(0);

  //******************boost page *******************/
  const [boostMultiScore, setBoostMultiScore] = useState<number>(0);
  const [boostMultiLevel, setBoostMultilevel] = useState<number>(0);
  const [boostMultiIsMax, setBoostMultiIsMax] = useState<boolean>(false);

  const [boostEnergyLimitScore, setBoostEnergyLimitScore] = useState<number>(0);
  const [boostEnergyLimitLevel, setBoostEnergyLimitLevel] = useState<number>(0);
  const [boostEnergyLimitIsMax, setBoostEnergyLimitIsMax] =
      useState<boolean>(false);

  const [boostRechargingScore, setBoostRechargingScore] = useState<number>(0);
  const [boostRechargingLevel, setBoostRechargingLevel] = useState<number>(0);
  const [boostRechargingIsMax, setBoostRechargingIsMAx] =
      useState<boolean>(false);

  const [boostBotLevel, setBoostBotLevel] = useState<number>(0);
  const [boostBotIsMax, setBoostBotIsMax] = useState<boolean>(false);
  const [boostBotScore, setBoostBotScore] = useState<number>(0);

  const [guruLeft, setGuruLeft] = useState(0);
  const [TankLeft, setTankLeft] = useState(0);
  const [max_special_boost, setMax_special_boost] = useState(0);
  const [next_update, setNext_update] = useState(0);

  /********************Stats page**************************/
  const [totalShareBalance, setTotalShareBalance] = useState<string>("");
  const [totalTouches, setTotalTouches] = useState<number>(0);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const [dailyUsers, setDailyUsers] = useState<number>(0);
  const [onlinePlayers, setOnlinePlayers] = useState<number>(0);

  /******************Task page ***************************/
  const [tasks, setTasks] = useState([]);
  const [leagues, setLeagues] = useState([]);
  const [refs, setRefs] = useState([]);
  const [taskClickAnswer, setTaskClickAnswer] = useState([]);
  const [taskCheckResult, setTaskCheckResult] = useState([]);
  const [balanceUp, setBalanceUp] = useState<number>(0);
  const [balanceUpRef, setBalanceUpRef] = useState<number>(0);

  /******************Ref page ****************************/
  const [myRefs, setMyRefs] = useState([]);
  const [refNum, setRefNum] = useState(0);
  const [inviteLink, setInviteLink] = useState("");

  /*****************Earning Modal ***********************/
  const [openEarningModal, setOpenEarningModal] = useState(false);
  const [botEarning, setBotEarning] = useState(null);
  const [initEnergy, setInitEnergy] = useState(false);

  /*****************loading ****************************/
  // const [loading, setLoading] = useState(true);


  /*********************sockets *************************/
  const WS_URL = "wss://api.spxswap.com/" + lp.initData?.user?.id;
  const socketUrlRef = useRef(WS_URL);

  const { sendMessage } = useWebSocket(socketUrlRef.current, {
    onOpen: () => console.log("Connected to WebSocket"),
    onMessage: (message) => {
      try {
        const parsedData = JSON.parse(message.data);
        const data = parsedData?.result;
        const topic = parsedData?.topic;
        const status = parsedData?.status;
        if (status) {
          /**tap page */
          if (topic === "balance") {
            setFromBalance(Number(data?.balance));
            setUserBalance(Number(data?.balance));
            setUserLevel(Number(data?.multi_tap));
            setGuru(data?.guru);
            setUserTrophy(data?.league);
            setAutoBot(data?.auto_bot);
          } else if (topic === "energy") {
            setCurrentEnergy(Number(data?.energy));
            setMaxEnergyLimit(Number(data?.max_energy));
            if (!initEnergy) {
              setInitEnergy(true);
            }
          } else if (topic === "stats") {
            /*****stats page */
            setTotalShareBalance(data?.total_shares);
            setTotalTouches(data?.total_touches);
            setTotalPlayers(data?.total_players);
            setDailyUsers(data?.daily_players);
            setOnlinePlayers(data?.online_players);
          } else if (topic === "special boost") {
            /**boost page */
            setGuruLeft(data?.guru_left);
            setTankLeft(data?.full_tank_left);
            setNext_update(data?.next_update);
            setMax_special_boost(data?.max_special_boost);
          } else if (topic === "boost") {
            /**multi */
            setBoostMultiScore(data?.multi_tap?.next_level_price);
            setBoostMultilevel(data?.multi_tap?.level);
            setBoostMultiIsMax(data?.multi_tap?.is_max);
            /**energy_limit */
            setBoostEnergyLimitIsMax(data?.energy_limit?.is_max);
            setBoostEnergyLimitLevel(data?.energy_limit?.level);
            setBoostEnergyLimitScore(data?.energy_limit?.next_level_price);
            /**recharging */
            setBoostRechargingScore(data?.recharging_speed?.next_level_price);
            setBoostRechargingLevel(data?.recharging_speed?.level);
            setBoostRechargingIsMAx(data?.recharging_speed?.is_max);
            /**bot */
            setBoostBotLevel(data?.tap_bot?.level);
            setBoostBotIsMax(data?.tap_bot?.is_max);
            setBoostBotScore(data?.tap_bot?.next_level_price);
          } else if (topic === "activate") {
            const unit = data?.unit;
            if (unit === "guru") {
              setGuruLeft(data?.new_left);
              setGuru(true);
            } else {
              setTankLeft(data?.new_left);
            }
            setNext_update(data?.finish_time);
            setCurrentEnergy(data?.energy);
          } else if (topic === "upgrade") {
            const unit = data?.upgraded_unit;
            if (unit === "multi_tap") {
              setBoostMultiIsMax(data?.is_max);
              setBoostMultilevel(data?.new_level);
              setBoostMultiScore(data?.next_level_price);
              setUserLevel(Number(data?.new_level));
            } else if (unit === "limit") {
              setBoostEnergyLimitIsMax(data?.is_max);
              setBoostEnergyLimitLevel(data?.new_level);
              setBoostEnergyLimitScore(data?.next_level_price);
            } else if (unit === "speed") {
              setBoostRechargingIsMAx(data?.is_max);
              setBoostRechargingLevel(data?.new_level);
              setBoostRechargingScore(data?.next_level_price);
            } else if (unit === "bot") {
              setBoostBotIsMax(data?.is_max);
              setBoostBotLevel(data?.new_level);
              setBoostBotScore(data?.next_level_price);
            }
            setFromBalance(userBalance);
            setUserBalance(data?.balance);
          } else if (topic === "tasks") {
            /****task page */
            setTasks(data?.special_tasks);
            setLeagues(data?.leagues);
            setRefs(data?.referral);
            setFromBalance(userBalance);
            setUserBalance(data?.balance);
            if (data?.balance_up !== 0) {
              setBalanceUpRef(data?.balance_up);
            }
            setUserTrophy(data?.leagues?.current);
            setUserTotalAmount(data?.leagues?.total_amount);
          } else if (topic === "tasks status") {
            setTaskClickAnswer(data?.check);
            setTaskCheckResult(data?.claim);
          } else if (topic === "tap") {
            setCurrentEnergy(data?.energy);

            setFromBalance(userBalance);
            setUserBalance(data?.balance);
            setUserTotalAmount(data?.amount);
          } else if (topic === "bot earning") {
            setBotEarning(data?.earning);
            setOpenEarningModal(true);
          } else if (topic === "referral") {
            setMyRefs(data?.my_refs);
            setInviteLink(data?.invite_link);
            setRefNum(data?.ref_num);
            setUserTotalAmount(data?.total_amount);
          } else if (topic === "claim league") {
            setBalanceUp(data?.balance_up);

            setFromBalance(userBalance);
            setUserBalance(data?.balance);
            setLeagues(data?.leagues);
            setUserTotalAmount(data?.leagues?.total_amount);
          }
          // else if (topic === "claim referral") {
          //   setBalanceUpRef(data?.balance_up);
          //   setUserBalance(data?.balance);
          //   setRefs(data?.referral);
          //   setUserTotalAmount(data?.leagues?.total_amount);
          // }
        }
      } catch (error) {
        console.error("Failed to decode JSON:", error);
      }
    },
    onError: (event) => console.error("WebSocket error:", event),
    // todo: onclose
    onClose: () => console.log("WebSocket connection closed"),
    shouldReconnect: () => true, // Automatically reconnect on disconnection
  });

  return (
      <NextUIProvider>
        <AppRoot
            appearance={miniApp.isDark ? 'dark' : 'light'}
            platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
        >
            <Router location={location} navigator={reactNavigator}>
              <Routes>
                {/*<Routes>*/}
                {/*  {routes.map((route) => <Route key={route.path} {...route} />)}*/}
                {/*  <Route path='*' element={<Navigate to='/'/>}/>*/}
                {/*</Routes>*/}

                <Route path="/" element={
                  <IndexPage
                      fBalance={fromBalance}
                      setFBalance={setFromBalance}
                      energy={currentEnergy}
                      balance={userBalance}
                      limit={maxEnergyLimit}
                      increment={userLevel}
                      guru={guru}
                      sendMessage={sendMessage}
                  />}/>
                <Route path="/boosts" element={<BoostsPage />}/>
              </Routes>
            </Router>

        </AppRoot>
      </NextUIProvider>
  );
};

