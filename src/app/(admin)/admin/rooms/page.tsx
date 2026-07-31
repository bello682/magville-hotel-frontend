import { BedDouble, Plus, Grid, List } from "lucide-react";

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-semibold">
            Home / Admin / Rooms
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Rooms Inventory
          </h1>
        </div>
        <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition flex items-center justify-center gap-1.5">
          <Plus className="w-4 h-4" /> Add New Room
        </button>
      </div>

      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 transition-colors">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Showing 0 available rooms
        </p>
        <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-950 p-1 border border-slate-200 dark:border-slate-800 rounded-lg">
          <button className="p-1.5 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded">
            <Grid className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3 transition-colors">
        <div className="inline-flex p-3 bg-sky-500/10 border border-sky-500/20 rounded-xl text-sky-600 dark:text-sky-400">
          <BedDouble className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Rooms Route Active
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          You are currently viewing the{" "}
          <code className="text-amber-500 font-mono">/admin/rooms</code> route.
          Room status grids and cards will load here.
        </p>
      </div>
    </div>
  );
}
