import React from "react";
import HouseCard from "./HouseCard";

const SimilarHousesGrid = ({houses,onclick,onFavorite,wishlist}) => {
    return (
        <div className="my-8">
            <h3 className="text-xl font-semibold mb-4">Similar Houses </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.map((house) => (
                    <HouseCard
                    key = {house.id}
                    house = {house}
                    onclick={onclick}
                    onFavorite={onFavorite}
                    isFavorite={wishlist.includes(house.id)} 
                    />
                ))}
            </div>
        </div>
    )
}
export default SimilarHousesGrid