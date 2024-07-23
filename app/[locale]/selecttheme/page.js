"use client";
import React from "react";
import Theme from "../components/theme/Theme";
import SelectedTheme from "../components/theme/SelectedTheme";
import Footer from "../components/Footers/Footer";
import { useGetWebBuildersQuery } from "@/lib/features/webBuilder/webBuilder";
import useCheckUnauthorized from "@/lib/features/auth/unauthorise";

function SelectTheme({ searchQuery, filters }) {
  const { data, error, isLoading } = useGetWebBuildersQuery();
  useCheckUnauthorized(error);

  // Debugging to ensure data is received and filters are applied
  console.log('Data:', data);
  console.log('Search Query:', searchQuery);
  console.log('Filters:', filters);

  const filteredData = data?.filter((theme) => {
    const matchesSearchQuery = searchQuery
      ? theme.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesFree = filters?.free ? theme.template_type === 'free' : true;
    const matchesPremium = filters?.premium ? theme.template_type === 'premium' : true;

    // Ensure that a template is included if it matches the search query and any selected filter
    return matchesSearchQuery && (matchesFree || matchesPremium);
  });

  return (
    <div className="mt-24">
      <SelectedTheme />
      <div className="flex flex-col m-8 mb-24">
        <div className="flex flex-col justify-center items-center mb-4">
          <h2 className="font-bold">Popular themes</h2>
          <p>
            Made with core features you can easily customize -- no coding needed
          </p>
        </div>
        <div className="flex w-full h-full gap-6 flex-wrap justify-center">
          {filteredData?.length > 0 ? (
            filteredData.map((theme) => <Theme key={theme.id} theme={theme} />)
          ) : (
            <p className="text-white">No themes found.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SelectTheme;
