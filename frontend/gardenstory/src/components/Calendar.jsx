import { useState, useEffect } from "react";
import axios from "axios";

const daysOfWeek = ["Su","Ma","Ti","Ke","To","Pe","La"];

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const blanks = Array(firstDayOfMonth).fill(null);
  const daysArray = [...blanks, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Hae merkinnät async/await
  useEffect(() => {
    if (!selectedDate) return;

    const fetchEntries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/entries");
        const filtered = res.data.filter(entry =>
          new Date(entry.date).toDateString() === new Date(selectedDate).toDateString()
        );
        setEntries(filtered);
      } catch (err) {
        console.error("Merkintöjen haku epäonnistui:", err);
      }
    };

    fetchEntries();
  }, [selectedDate]);

  // Lisää uusi merkintä async/await
  const addEntry = async () => {
    if (!newTitle) return;
    try {
      const res = await axios.post("http://localhost:5000/entries", {
        title: newTitle,
        description: newDescription,
        date: selectedDate,
      });
      setEntries(prev => [...prev, res.data]);
      setNewTitle("");
      setNewDescription("");
    } catch (err) {
      console.error("Merkinnän lisääminen epäonnistui:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="px-3 py-1 bg-green-200 rounded hover:bg-green-300">{"<"}</button>
        <h2 className="text-lg font-bold">{currentDate.toLocaleString("default",{ month: "long" })} {year}</h2>
        <button onClick={nextMonth} className="px-3 py-1 bg-green-200 rounded hover:bg-green-300">{">"}</button>
      </div>

      {/* Päivien nimet */}
      <div className="grid grid-cols-7 text-center font-semibold mb-2">
        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
      </div>

      {/* Päivät */}
      <div className="grid grid-cols-7 text-center gap-1">
        {daysArray.map((day, index) =>
          day ? (
            <div
              key={index}
              className={`p-2 rounded cursor-pointer hover:bg-green-100 ${selectedDate === `${year}-${month+1}-${day}` ? "bg-green-200" : ""}`}
              onClick={() => setSelectedDate(`${year}-${month+1}-${day}`)}
            >
              {day}
            </div>
          ) : <div key={index}></div>
        )}
      </div>

      {/* Merkinnät */}
      {selectedDate && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Merkinnät {selectedDate}</h3>
          <div className="flex flex-col gap-2 mb-2">
            {entries.map(entry => (
              <div key={entry._id} className="p-2 border rounded">
                <strong>{entry.title}</strong>
                <p className="text-sm">{entry.description}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <input
              type="text"
              placeholder="Otsikko"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Kuvaus"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="border p-2 rounded"
            />
            <button
              onClick={addEntry}
              className="px-3 py-2 bg-green-300 rounded hover:bg-green-400"
            >
              Lisää merkintä
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

