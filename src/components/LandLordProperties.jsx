import React from 'react';
import { useNavigate } from 'react-router-dom';
import { houses } from '../houses';

const MyProperty = () => {
    const navigate = useNavigate();

    const handleEdit = (e) => {
        e.stopPropagation();
        console.log("Edit clicked");
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        console.log("Delete clicked");
    };

    const handleView = (e, id) => {
        e.stopPropagation();
        navigate(`/properties/${id}`);
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {houses.map((house) => (
                    <div
                        key={house.id}
                        onClick={() => navigate(`/properties/${house.id}`)}
                        className="cursor-pointer transition-transform duration-200 hover:scale-105"
                    >
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <img
                                src={Array.isArray(house.image) ? house.image[0] : house.image}
                                alt={house.title}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-3 font-semibold text-lg">
                                {house.title} - {house.location}
                            </div>
                            <div className="border-t border-gray-200 px-3 py-2 flex justify-between text-sm">
                                <button onClick={handleEdit} className="text-blue-500 hover:underline cursor-pointer">
                                    ✏️ Edit
                                </button>
                                <button onClick={handleDelete} className="text-red-500 hover:underline cursor-pointer">
                                    ❌ Delete
                                </button>
                                <button onClick={(e) => handleView(e, house.id)} className="hover:underline cursor-pointer">
                                    👁️ View
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyProperty;
