"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
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
  const [retryCount, setRetryCount] = useState(0);

  const fetchStore = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch("/api/pharmacist/store");

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch store data");
      }

      const data = await response.json();
      setStore(data);
      if (data) {
        setFormData({
          name: data.name,
          address: data.address,
          phoneNumber: data.phoneNumber,
          description: data.description,
          pcn: data.pcn,
        });
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load store information"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isPharmacist) {
      router.push("/dashboard");
      return;
    }

    fetchStore();
  }, [isPharmacist, router]);

  const handleRetry = async () => {
    setRetryCount((prev) => prev + 1);
    await fetchStore();
  };

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

    const loadingToast = toast.loading(
      store ? "Updating store..." : "Creating store..."
    );

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
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update store");
      }

      const updatedStore = await response.json();
      setStore(updatedStore);
      setIsEditing(false);
      setImageFile(null);
      setPreviewImage(null);

      // Show success message
      const successMessage = store
        ? "Store updated successfully"
        : "Store created successfully";
      toast.success(successMessage, { id: loadingToast });
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to update store information";
      setError(errorMessage);
      toast.error(errorMessage, { id: loadingToast });
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

  if (error && !isEditing) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <BuildingStorefrontIcon className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Error Loading Store
          </h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={handleRetry}
            disabled={retryCount >= 3}
            className={`px-4 py-2 rounded-md ${
              retryCount >= 3
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {retryCount >= 3 ? "Too many retries" : "Try Again"}
          </button>
          {retryCount >= 3 && (
            <p className="mt-2 text-sm text-gray-500">
              Please refresh the page or try again later
            </p>
          )}
        </div>
      </div>
    );
  }

  // Show the form in both cases: when setting up a new store or editing an existing one
  if (!store || isEditing) {
    return (
      <>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#333",
              color: "#fff",
            },
            success: {
              style: {
                background: "green",
              },
            },
            error: {
              style: {
                background: "red",
              },
              duration: 5000,
            },
          }}
        />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
              <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">
                  {store ? "Edit Store" : "Set Up Your Store"}
                </h1>
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
                      className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="Enter your store name"
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
                      className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="Enter store phone number"
                    />
                  </div>

                  <div className="col-span-2">
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
                      className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="Enter store address"
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
                      className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="Enter PCN registration number"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="mt-1 block w-full rounded-md shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="Enter a brief description of your store"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Store Image
                  </label>
                  <div className="mt-2 flex items-center space-x-4">
                    <div className="relative h-32 w-32 overflow-hidden rounded-lg border border-gray-200">
                      <Image
                        src={
                          previewImage ||
                          store?.image ||
                          "https://placehold.co/400x300"
                        }
                        alt="Store"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                      <PhotoIcon className="h-5 w-5 mr-2 text-gray-400" />
                      {store ? "Change Image" : "Add Image"}
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  {store && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsEditing(false);
                        setImageFile(null);
                        setPreviewImage(null);
                        setFormData({
                          name: store.name,
                          address: store.address,
                          phoneNumber: store.phoneNumber,
                          description: store.description,
                          pcn: store.pcn,
                        });
                      }}
                      disabled={isSaving}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSaving ? (
                      <span className="flex items-center">
                        <ArrowPathIcon className="animate-spin h-4 w-4 mr-2" />
                        Saving...
                      </span>
                    ) : store ? (
                      "Save Changes"
                    ) : (
                      "Create Store"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: {
              background: "green",
            },
          },
          error: {
            style: {
              background: "red",
            },
            duration: 5000,
          },
        }}
      />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Store Details
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Store Name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{store.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Phone Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {store.phoneNumber}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      PCN Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{store.pcn}</dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Location & Description
                </h2>
                <dl className="mt-4 space-y-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {store.address}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">
                      Description
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {store.description}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="col-span-2">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Store Image
                </h2>
                <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-200">
                  <Image
                    src={store.image}
                    alt="Store"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
