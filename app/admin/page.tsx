"use client";

import { useState } from "react";
import AdminChatDashboard from "@/components/Admin/AdminChatDashboard";
import Button from "@/components/Common/Button";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [inputPw, setInputPw] = useState("");

  const handleLogin = () => {
    if (inputPw === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  if (authenticated) return <AdminChatDashboard />;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black text-white">
      <div className="flex flex-col gap-5 bg-white/10 p-10 rounded-2xl">
        <h1 className="h4">관리자 로그인</h1>
        <input
          type="password"
          value={inputPw}
          onChange={(e) => setInputPw(e.target.value)}
          className="p-4 rounded bg-black text-white border border-gray-40"
          placeholder="비밀번호 입력"
        />
        <Button
          onClick={handleLogin}
          className="bg-white text-black rounded-xl px-4 py-2 hover:!bg-white hover:text-black"
          variant="secondary"
          size="md"
        >
          로그인
        </Button>
      </div>
    </div>
  );
}
