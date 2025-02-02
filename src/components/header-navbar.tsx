import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { DefaultUserIcon, EduzyLogoWithTitle } from "./icons";

import { removeTokenFromLocalStorage } from "@/lib/utils";
import { Constants } from "@/lib/utils/constants";
import { AppTexts } from "@/lib/utils/texts";

export default function HeaderNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      label: AppTexts.navbarTestsTexts,
      href: Constants.routes.tests,
    },
    {
      label: AppTexts.navbarReportsText,
      href: Constants.routes.reports,
    },
  ];

  return (
    <Navbar
      isBordered
      classNames={{
        item: [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-0",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[2px]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-primary",
          "text-md",
        ],
      }}
      height={"3.7rem"}
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={
            isMenuOpen
              ? AppTexts.closeMenuAriaLabel
              : AppTexts.openMenuAriaLabel
          }
          className="sm:hidden text-primary"
        />
        <NavbarBrand className="mr-4">
          <EduzyLogoWithTitle
            className="w-[5em] h-[3em] cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => navigate(Constants.routes.home)}
            onKeyDown={(e) =>
              e.key === "Enter" && navigate(Constants.routes.home)
            }
          />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={`${item.label}-${index}`}
            data-active={item.href === location.pathname}
          >
            <Link
              color={item.href === location.pathname ? "primary" : "foreground"}
              href={item.href}
            >
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              className="w-full"
              color={item.href === location.pathname ? "primary" : "foreground"}
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>

      <NavbarContent as="div" className="items-center" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              classNames={{
                base: "bg-transparent",
              }}
              icon={<DefaultUserIcon size="2rem" />}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Settings</DropdownItem>
            <DropdownItem key="system">System</DropdownItem>
            <DropdownItem
              key="logout"
              color="danger"
              onClick={() => {
                removeTokenFromLocalStorage();
                navigate(Constants.routes.login);
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
