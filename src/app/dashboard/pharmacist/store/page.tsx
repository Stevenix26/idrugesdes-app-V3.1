"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import {
  BuildingStorefrontIcon,
  PhotoIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";

interface Store {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  description: string;
  pcn: string;
  image: string;
}

export default function PharmacyStorePage() {
  const router = useRouter();
  const { user, isPharmacist } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    description: "",
    pcn: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isPharmacist) {
      router.push("/dashboard");
      return;
    }

    const fetchStore = async () => {
      try {
        const response = await fetch("/api/pharmacist/store");
        if (!response.ok) throw new Error("Failed to fetch store data");
        const data = await response.json();
        setStore(data);
        setFormData({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          description: data.description,
          pcn: data.pcn,
        });
      } catch (err) {
        setError("Failed to load store information");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStore();
  }, [isPharmacist, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      const response = await fetch("/api/pharmacist/store", {
        method: "PUT",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error("Failed to update store");
      }

      const updatedStore = await response.json();
      setStore(updatedStore);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to update store information");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <ArrowPathIcon className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="mt-2 text-gray-600">Loading store information...</p>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <BuildingStorefrontIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Store Found
          </h2>
          <p className="text-gray-600 mb-4">
            It seems you haven't set up your pharmacy store yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                Pharmacy Store Management
              </h1>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Store
                </button>
              )}
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Store Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="phoneNumber"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pcn"
                    className="block text-sm font-medium text-gray-700"
                  >
                    PCN Number
                  </label>
                  <input
                    type="text"
                    id="pcn"
                    name="pcn"
                    value={formData.pcn}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`mt-1 block w-full rounded-md shadow-sm ${
                      isEditing
                        ? "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>

                {isEditing && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Store Image
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="relative w-32 h-32 rounded-lg overflow-hidden bg-gray-100">
                        {(previewImage || store.image) && (
                          <Image
                            src={previewImage || store.image}
                            alt="Store preview"
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span>Change Image</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: store.name,
                        address: store.address,
                        phoneNumber: store.phoneNumber,
                        description: store.description,
                        pcn: store.pcn,
                      });
                      setPreviewImage(null);
                      setImageFile(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                      isSaving ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
