import React, { useState, useEffect } from "react";
import { details } from "../RewardsDetailsData";
import {
  FaCouch,
  FaBed,
  FaChair,
  FaGift,
  FaRegSadTear,
} from "react-icons/fa";
// Assign points per furniture type
const furniturePoints = {
  Sofa: 40,
  Bed: 50,
  "Dining Chairs": 30,
};
const FurnitureRewards = () => {
  const [selectedHouseIndex, setSelectedHouseIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  // Collect furniture for selected house
  const furnitureItems =
    details[selectedHouseIndex]?.furniture?.map((item, index) => ({
      id: `${selectedHouseIndex}-${index}`,
      name: item,
      points: furniturePoints[item] || 20,
      icon:
        item === "Sofa" ? (
          <FaCouch />
        ) : item === "Bed" ? (
          <FaBed />
        ) : item === "Dining Chairs" ? (
          <FaChair />
        ) : (
          <FaGift />
        ),
    })) || [];
  useEffect(() => {
    const totalPoints = furnitureItems.reduce((sum, item) => sum + item.points, 0);
    setPoints(totalPoints);
  }, [selectedHouseIndex]);
  const handleRedeem = () => {
    if (points > 0) {
      setHistory([
        {
          id: history.length + 1,
          amount: points,
          date: new Date().toISOString().split("T")[0],
        },
        ...history,
      ]);
      setPoints(0);
      alert("🎉 Rewards redeemed successfully!");
    } else {
      alert("No points to redeem.");
    }
  };
  // No furniture message
  if (furnitureItems.length === 0) {
    return (
      <div className="text-center px-4 pt-10 pb-2">
        <section className="px-4 sm:px-6 py-10 text-center min-h-screen flex flex-col justify-center items-center">
          <FaRegSadTear className="text-6xl text-gray-400 mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            No rewards yet
          </h2>
          <p className="text-gray-500">
            No furniture has been left behind by any tenant in this house.
          </p>
        </section>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Furniture Rewards</h1>
        <p className="text-gray-600 mt-2">
          Earn points by leaving your furniture behind for the next tenant.
          Redeem anytime!
        </p>
      </div>
      {/* House Selection with Images */}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Select a House
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {details.map((house, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden shadow-md cursor-pointer transition transform hover:scale-105 ${
                selectedHouseIndex === index ? "ring-4 ring-blue-500" : ""
              }`}
              onClick={() => setSelectedHouseIndex(index)}
            >
              <img
                src={house.image}
                alt={house.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{house.name}</h3>
                <p className="text-gray-500 text-sm">{house.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Rewards Summary */}
      <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Reward Points</h2>
          <p className="text-2xl font-bold text-green-600">{points} pts</p>
        </div>
        <button
          onClick={handleRedeem}
          disabled={points === 0}
          className={`flex items-center px-4 py-2 rounded-lg font-medium transition ${
            points === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <FaGift className="mr-2" /> Redeem Now
        </button>
      </div>
      {/* Furniture Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Furniture Contributed</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {furnitureItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow rounded-xl p-6 flex flex-col items-center"
            >
              <div className="text-4xl text-blue-500 mb-3">{item.icon}</div>
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-green-600 font-semibold mt-1">
                {item.points} pts
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Redemption History */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Redemption History</h2>
        {history.length === 0 ? (
          <p className="text-gray-500">No redemptions yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((entry) => (
              <li
                key={entry.id}
                className="flex justify-between bg-gray-50 p-3 rounded-lg"
              >
                <span>{entry.date}</span>
                <span className="font-semibold text-green-600">
                  -{entry.amount} pts
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default FurnitureRewards;