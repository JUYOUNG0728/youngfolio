"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebaseConfig";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  Timestamp,
  limit,
  where,
} from "firebase/firestore";

interface Message {
  id: string;
  uid: string;
  sender: "admin" | "user";
  text: string;
  timestamp: Timestamp;
}

const ADMIN_PASSWORD = "123"; // 실제론 환경변수로 관리하세요

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [selectedUid, setSelectedUid] = useState<string | null>(null);
  const [rooms, setRooms] = useState<
    { uid: string; lastMessage: string; lastTimestamp: Timestamp }[]
  >([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState("");

  // 1. 비밀번호 확인
  const handleLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  // 2. 채팅방 목록 실시간 구독 (마지막 메시지 일부 포함)
  useEffect(() => {
    if (!isAuthenticated) return;

    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "desc"),
      limit(1000) // 너무 많으면 조절하세요
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      // 메시지들을 유저별로 그룹핑해서 마지막 메시지만 남김
      const grouped = new Map<
        string,
        { lastMessage: string; lastTimestamp: Timestamp }
      >();

      snapshot.docs.forEach((doc) => {
        const data = doc.data() as Message;
        const uid = data.uid;
        const last = grouped.get(uid);

        if (
          !last ||
          data.timestamp.toMillis() > last.lastTimestamp.toMillis()
        ) {
          grouped.set(uid, {
            lastMessage:
              data.text.length > 20
                ? data.text.slice(0, 20) + "..."
                : data.text,
            lastTimestamp: data.timestamp,
          });
        }
      });

      // 배열로 변환
      const roomList = Array.from(grouped.entries()).map(([uid, val]) => ({
        uid,
        lastMessage: val.lastMessage,
        lastTimestamp: val.lastTimestamp,
      }));

      // 시간 내림차순 정렬
      roomList.sort(
        (a, b) => b.lastTimestamp.toMillis() - a.lastTimestamp.toMillis()
      );

      setRooms(roomList);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  // 3. 선택된 uid의 메시지 실시간 구독
  useEffect(() => {
    if (!selectedUid) {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, "messages"),
      where("uid", "==", selectedUid),
      orderBy("timestamp")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Message, "id">),
        }))
      );
    });

    return () => unsubscribe();
  }, [selectedUid]);

  // 4. 답장 보내기
  const handleSendReply = async () => {
    if (!reply.trim()) return alert("답변을 입력해주세요.");
    if (!selectedUid) return alert("대상 유저를 선택해주세요.");

    await addDoc(collection(db, "messages"), {
      uid: selectedUid,
      sender: "admin",
      text: reply,
      timestamp: new Date(),
    });
    setReply("");
  };

  // 시간 포맷
  const formatTime = (timestamp: Timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="p-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-4">
        <h2>관리자 로그인</h2>
        <input
          type="password"
          placeholder="비밀번호 입력"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
        />
        <button className="bg-white" onClick={handleLogin}>
          로그인
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20, display: "flex", gap: 20 }}>
      {/* 채팅방 목록 */}
      <div
        style={{
          width: 300,
          borderRight: "1px solid #ddd",
          height: "80vh",
          overflowY: "auto",
        }}
      >
        <h3>채팅방 목록</h3>
        {rooms.length === 0 && <p>채팅방이 없습니다.</p>}
        {rooms.map((room) => (
          <div
            key={room.uid}
            onClick={() => setSelectedUid(room.uid)}
            style={{
              cursor: "pointer",
              padding: 10,
              backgroundColor:
                room.uid === selectedUid ? "#e0e0e0" : "transparent",
            }}
          >
            <b>{room.uid}</b>
            <p style={{ fontSize: 12, color: "#666", margin: 0 }}>
              {room.lastMessage}
            </p>
            <small style={{ color: "#999" }}>
              {formatTime(room.lastTimestamp)}
            </small>
          </div>
        ))}
      </div>

      {/* 대화 상세 */}
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <h3>{selectedUid ? `${selectedUid}와 대화` : "대화를 선택해주세요"}</h3>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: 10,
            border: "1px solid #ddd",
            backgroundColor: "#fafafa",
            marginBottom: 10,
          }}
        >
          {messages.length === 0 && <p>메시지가 없습니다.</p>}
          {messages.map((msg) => (
            <div key={msg.id} style={{ marginBottom: 10 }}>
              <b>{msg.sender === "admin" ? "관리자" : "사용자"}:</b> {msg.text}
              <span style={{ color: "#999", marginLeft: 10, fontSize: 12 }}>
                {formatTime(msg.timestamp)}
              </span>
            </div>
          ))}
        </div>

        {selectedUid && (
          <div>
            <textarea
              rows={3}
              placeholder="답변을 입력하세요"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              style={{ width: "100%" }}
            />
            <button onClick={handleSendReply} style={{ marginTop: 8 }}>
              답장 보내기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
