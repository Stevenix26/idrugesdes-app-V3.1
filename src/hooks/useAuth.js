import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useAuth() {
    const { user, isLoaded, isSignedIn } = useUser();

    const { data: dbUser, isLoading: isLoadingDbUser } = useQuery({
        queryKey: ["user", user?.emailAddresses[0]?.emailAddress],
        queryFn: async () => {
            if (!user?.emailAddresses[0]?.emailAddress) return null;
            const response = await axios.get(`/api/users?email=${user.emailAddresses[0].emailAddress}`);
            return response.data;
        },
        enabled: !!user?.emailAddresses[0]?.emailAddress,
    });

    const isPharmacist = dbUser?.role === "PHARMACIST";
    const isAdmin = dbUser?.role === "ADMIN";
    const isPatient = dbUser?.role === "PATIENT";

    return {
        user,
        dbUser,
        isLoaded,
        isSignedIn,
        isLoadingDbUser,
        isPharmacist,
        isAdmin,
        isPatient,
    };
} 