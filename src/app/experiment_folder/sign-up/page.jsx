'use client'
import {
  CreateOrganization, OrganizationSwitcher, OrganizationProfile, SignedIn, SignedOut,
  RedirectToOrganizationProfile, } from "@clerk/nextjs";

export default function OrganizationSwitcherPage() {
  return (
    <div>
      Hellon helloe
  
      <SignedOut>
        Please Sign In
      </SignedOut>
      <CreateOrganization />
      <OrganizationProfile routing='path' path="/organization-profile" />
      <OrganizationSwitcher />
    </div>
  );
}
