import { theme } from "../styles/theme";
import styled from "styled-components";
import { SiTodoist } from "react-icons/si";
import { IoIosNotifications, IoIosSettings, IoMdSearch } from "react-icons/io";
import { BiChevronDown } from "react-icons/bi";
import { MdAdd } from "react-icons/md";
import { AiFillQuestionCircle } from "react-icons/ai";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

type Menu = {
  title: string;
  subMenu: {
    title: string;
    url: string;
  }[];
  show: boolean;
};

type HeaderProps = {
  openModal: () => void;
};

export const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const [menu, setMenu] = useState<Menu[]>([
    {
      title: "あなたの作業",
      subMenu: [
        { title: "作業1", url: "" },
        { title: "作業2", url: "" },
      ],
      show: true,
    },
    {
      title: "プロジェクト",
      subMenu: [
        { title: "プロジェクト1", url: "" },
        { title: "プロジェクト2", url: "" },
      ],
      show: true,
    },
    {
      title: "フィルター",
      subMenu: [
        { title: "フィルター1", url: "" },
        { title: "フィルター2", url: "" },
      ],
      show: true,
    },
  ]);

  const [detailMenu, setDetailMenu] = useState<{
    title: string;
    subMenu: Menu[];
    show: boolean;
  }>({
    title: "詳細",
    subMenu: [],
    show: false,
  });

  const arrangeMenu = useCallback(() => {
    let detail = detailMenu;
    let alterMenu = menu;
    if (window.innerWidth < 760) {
      detail = {
        title: "詳細",
        subMenu: [menu[0], menu[1], menu[2]],
        show: true,
      };
      alterMenu[2].show = false;
      alterMenu[1].show = false;
      alterMenu[0].show = false;
    } else if (window.innerWidth < 918) {
      detail = {
        title: "詳細",
        subMenu: [menu[1], menu[2]],
        show: true,
      };
      alterMenu[2].show = false;
      alterMenu[1].show = false;
      alterMenu[0].show = true;
    } else {
      detail = {
        title: "詳細",
        subMenu: [],
        show: false,
      };
      alterMenu[2].show = true;
      alterMenu[1].show = true;
      alterMenu[0].show = true;
    }
    setDetailMenu(detail);
    setMenu(alterMenu);
  }, [detailMenu, menu]);

  window.onresize = arrangeMenu;

  useEffect(() => {
    arrangeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderStyle>
        <Nav>
          {/* <CgMenuGridR size={25} /> */}
          <LogoLink to="/">
            <SiTodoist size={20} color="#2684FF" />
            ToDo
          </LogoLink>
          <MenuBar>
            {menu.map(
              ({ title, subMenu, show }, i) =>
                show && (
                  <Dropdown as={ButtonWrapper} key={title}>
                    <Dropdown.Toggle as={MenuButton}>
                      <span>{title}</span>
                      <BiChevronDown size={16} color="#97A1AF" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {subMenu.length > 0 &&
                        subMenu.map(({ title, url }) => (
                          <Dropdown.Item href={url} key={title}>
                            {title}
                          </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                  </Dropdown>
                )
            )}
            {detailMenu.show && (
              <Dropdown as={ButtonWrapper}>
                <Dropdown.Toggle as={MenuButton}>
                  <span>{detailMenu.title}</span>
                  <BiChevronDown size={16} color="#97A1AF" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {detailMenu.subMenu.length > 0 &&
                    detailMenu.subMenu.map(({ title, subMenu }, i) => (
                      <Dropdown.Item key={title}>
                        <Dropdown>
                          <Dropdown.Toggle as={MenuButton}>
                            {title}
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            {subMenu.map(({ title, url }) => (
                              <Dropdown.Item href={url} key={title}>
                                {title}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
            )}
          </MenuBar>
          <Button onClick={openModal}>
            <Txt>作成</Txt>
            <StyledMdAdd size={20} />
          </Button>
          <Space />
        </Nav>
        <RightDiv>
          <SeachWrapper data-tip="検索">
            <Search type="text" placeholder="検索" enterKeyHint="search" />
            <SearchIcon />
          </SeachWrapper>
          <IconButtonSearch>
            <IoMdSearch size={24} color={theme.colors.textLowEmphasis} />
          </IconButtonSearch>
          <IconButton data-tip="通知">
            <StyledIoIosNotifications size={24} />
          </IconButton>
          <IconButton data-tip="へルプ">
            <AiFillQuestionCircle size={24} />
          </IconButton>
          <IconButton data-tip="設定">
            <IoIosSettings size={24} />
          </IconButton>
          <IconButton data-tip="プロフィールと設定">
            <ProfileImg />
          </IconButton>
        </RightDiv>
        {/* <ReactTooltip
          place="bottom"
          type="dark"
          effect="solid"
          className="react-tool-tip"
        /> */}
      </HeaderStyle>
    </>
  );
};

const HeaderStyle = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  height: 56px;
  position: relative;
  background-color: #ffffff;
  color: ${theme.colors.textMenu};

  &::after {
    content: "";
    position: absolute;
    left: 0px;
    right: 0px;
    top: 100%;
    height: 4px;
    background: linear-gradient(
      rgba(9, 30, 66, 0.13) 0px,
      rgba(9, 30, 66, 0.13) 1px,
      rgba(9, 30, 66, 0.08) 1px,
      rgba(9, 30, 66, 0) 4px
    );
  }

  .react-tool-tip {
    padding: 6px;
    font-size: 10px;
    line-height: 1;
    margin-top: 8px !important;

    &::after {
      display: none;
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-weight: 500;
  height: 100%;
`;

const Space = styled.div`
  min-width: 80px;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: ${theme.colors.text};
  gap: 10px;
`;

const MenuBar = styled.div`
  display: flex;
  gap: 8px;
  margin-left: 20px;
  height: 100%;
  position: relative;

  .dropdown-toggle::after {
    display: none;
  }

  .selected {
    color: ${theme.colors.primaryblue};
    &::after {
      position: absolute;
      bottom: 0px;
      left: 4px;
      right: 4px;
      content: "";
      height: 3px;
      background-color: ${theme.colors.primaryblue};
      border-top-left-radius: 1px;
      border-top-right-radius: 1px;
    }
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

const MenuButton = styled.button`
  display: inline-flex;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  line-height: 32px;
  padding: 0px 4px;
  color: ${theme.colors.textMenu};
  font-weight: 500;

  &:hover {
    color: ${theme.colors.primaryblue};
    background-color: ${theme.colors.backgroungHover};
  }
`;

const Button = styled.button`
  background-color: ${theme.colors.primaryblue};
  border-radius: 3px;
  color: white;
  padding: 0px 10px;
  margin-left: 12px;
  height: 32px;

  &:hover {
    opacity: ${theme.opacity};
  }

  &:disabled {
    background-color: #f1f5f9;
    color: #cbd5e1;
  }

  @media screen and (max-width: 961px) {
    padding: 0px 6px;
  }
`;

const Txt = styled.span`
  @media screen and (max-width: 961px) {
    display: none;
  }
`;

const StyledMdAdd = styled(MdAdd)`
  display: none;
  @media screen and (max-width: 961px) {
    display: block;
  }
`;

const RightDiv = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;

  svg {
    flex-shrink: 0;
  }
`;

const SeachWrapper = styled.div`
  position: relative;
  max-width: 100%;
  width: 200px;
  margin-right: 4px;

  @media screen and (max-width: 650px) {
    display: none;
  }
`;

const Search = styled.input`
  height: 32px;
  width: 100%;
  padding: 0px 12px 0px 30px;
  border-radius: 5px;
  line-height: 20px;
  border: 2px solid ${theme.colors.borderInput};

  ::placeholder {
    color: ${theme.colors.textSubtlest};
  }
`;

const SearchIcon = styled(IoMdSearch)`
  width: 16px;
  height: 16px;
  position: absolute;
  top: 8px;
  left: 8px;
  color: ${theme.colors.textSubtlest}; ;
`;

const IconButton = styled.div`
  padding: 4px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.backgroungHover};
    opacity: ${theme.opacity};
    color: ${theme.colors.primaryblue};
  }
`;

const IconButtonSearch = styled(IconButton)`
  display: none;

  @media screen and (max-width: 650px) {
    display: flex;
  }
`;

const StyledIoIosNotifications = styled(IoIosNotifications)`
  transform: rotate(45deg);
`;

const ProfileImg = styled.div`
  height: 24px;
  width: 24px;
  background-image: url(https://dummyimage.com/24x24.png);
  border-radius: 50%;
  flex-shrink: 0;
`;
