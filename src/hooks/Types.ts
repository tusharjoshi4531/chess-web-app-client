import { Socket } from "socket.io-client";
import { IChallengeData, IGameState, IGameFinish, IGameResult } from "../store/game/types";

export type SocketConnect = (
    data: {
        userId: string;
        username: string;
        email: string;
    },
    callback: (status: boolean) => void
) => void;

export type SocketDisconnect = () => void;

export type SocketSendChallenge = (
    data: IChallengeData,
    callback: (status: boolean) => void
) => void;

export type SocketSubscribeChallengeReceive = (
    callback: (data: IChallengeData) => void
) => void;

export type SocketUnsubscribeChallengeReceive = () => void;

export type SocketSubscribeChallengeCreated = (
    callback: (data: IGameState) => void
) => void;

export type SocketUnsubscribeChallengeCreated = () => void;

export type SocketSubscribeMoveMade = (
    callback: (data: { boardState: string }) => void
) => void;

export type SocketUnsubscribeMoveMade = () => void;

export type SocketSubscribeGameFinish = (
    callback: (data: IGameResult) => void
) => void;

export type SocketUnsubscribeGameFinish = () => void;

export interface IUseSocketValue {
    obj: Socket;
    disconnect: SocketDisconnect;
    connect: SocketConnect;
    sendChallenge: SocketSendChallenge;
    subscribeChallengeReceive: SocketSubscribeChallengeReceive;
    unsubscribeChallengeReceive: SocketUnsubscribeChallengeReceive;
    subscribeChallengeCreated: SocketSubscribeChallengeCreated;
    unsubscribeChallengeCreated: SocketUnsubscribeChallengeCreated;
    subscribeMoveMade: SocketSubscribeMoveMade;
    unsubscribeMoveMade: SocketUnsubscribeMoveMade;
    subscribeGameFinish: SocketSubscribeGameFinish;
    unsubscribeGameFinish: SocketUnsubscribeGameFinish;
}
