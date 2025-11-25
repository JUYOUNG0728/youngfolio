type UserListPanelProps = {
  uids: string[];
  activeUid: string | null;
  setActiveUid: (uid: string) => void;
};

export default function UserListPanel({
  uids,
  activeUid,
  setActiveUid,
}: UserListPanelProps) {
  return (
    <div className="w-[22vw] h-full bg-white/10 border-r border-gray-40 px-8 pb-8 pt-36 overflow-y-auto xl:pt-44">
      <h2 className="mb-8 h5">채팅 목록</h2>

      <div className="flex flex-col gap-3">
        {uids.map((uid) => (
          <button
            key={uid}
            onClick={() => setActiveUid(uid)}
            className={`p-3 body4 rounded-xl text-left ${
              activeUid === uid
                ? "bg-white text-black"
                : "bg-white/5 text-white"
            }`}
          >
            {uid}
          </button>
        ))}
      </div>
    </div>
  );
}
