import { useState } from "react";
import Image from "next/image";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export const DashboardNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const isCurrentPage = (path: string) => pathname.includes(path);

  const menuItems: string[] = ["Branch", "Service"];

  const logout = async () => {
    const res = await fetch("/api/v1/logout", { method: "GET" });
    await toast.promise(Promise.all([res]), {
      loading: "Loading...",
      success: "Success logout!",
      error: "Gagal logout!",
    });
    if (res.status === 200) router.replace("/login");
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Image src="/logo.png" alt="logo" width={72} height={72} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={isCurrentPage("/dashboard/branch")}>
          <Link
            color={
              isCurrentPage("/dashboard/branch") ? "primary" : "foreground"
            }
            href="/dashboard/branch"
          >
            Branch
          </Link>
        </NavbarItem>
        <NavbarItem isActive={isCurrentPage("/dashboard/service")}>
          <Link
            color={
              isCurrentPage("/dashboard/service") ? "primary" : "foreground"
            }
            href="/dashboard/service"
          >
            Service
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button onClick={logout} variant="flat" color="danger">
            Log out
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2
                  ? "primary"
                  : index === menuItems.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
