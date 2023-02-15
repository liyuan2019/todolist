import { theme } from "../styles/theme";
import Modal from "react-modal";
import styled from "styled-components";
import BootstrapModal from "react-bootstrap/Modal";
import BootstrapButton from "react-bootstrap/Button";
import { useProjectModal } from "../hooks/useProjectModal";
import { ColorPicker } from "./ColorPicker";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useState } from "react";

Modal.setAppElement("#root");

const modalStyle = {
  overlay: {
    backgroundColor: `${theme.colors.backgroundOverlay}`,
    zIndex: 1,
  },
  content: {
    top: `50%`,
    left: "50%",
    right: "auto",
    bottom: "auto",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "24px",
    width: "600px",
    height: "500px",
  },
};

export const ProjectModal: React.FC = () => {
  const {
    name,
    introduction,
    color,
    resetProject,
    onChangeName,
    onChangeIntroduction,
    setColor,
    onClickAdd,
    onClickEdit,
    onClickDelete,
  } = useProjectModal();

  const { projectModalOpen, editFlag } = useSelector(
    (state: RootState) => state.projectModal
  );

  const [deleteDialogShow, setDeleteDialogShow] = useState(false);

  const handleDelete = () => {
    onClickDelete();
    setDeleteDialogShow(false);
  };

  return (
    <>
      <Modal
        isOpen={projectModalOpen}
        onRequestClose={resetProject}
        style={modalStyle}
        contentLabel="プロジェクト追加"
      >
        <ModalHeader>
          {editFlag ? "プロジェクト編集" : "プロジェクト追加"}
        </ModalHeader>
        <ModalContent>
          <Item>
            <Label htmlFor="name">名前(略称)</Label>
            <Input
              id="name"
              maxLength={16}
              name="name"
              value={name}
              onChange={onChangeName}
            />
          </Item>
          <Item>
            <Label htmlFor="introduction">説明</Label>
            <Input
              id="introduction"
              name="introduction"
              as="textarea"
              rows={3}
              value={introduction}
              onChange={onChangeIntroduction}
            />
          </Item>
          <Item>
            <Label>色</Label>
            <ColorPicker color={color} setColor={setColor} />
          </Item>
        </ModalContent>
        <ModalFooter>
          {editFlag && name !== "未分類" && (
            <DeleteButton onClick={() => setDeleteDialogShow(true)}>
              削除
            </DeleteButton>
          )}
          <Button onClick={resetProject}>キャンセル</Button>
          <CreateButton
            editFlag={editFlag}
            disabled={name === ""}
            onClick={onClickAdd}
          >
            追加
          </CreateButton>
          <EditButton
            editFlag={editFlag}
            disabled={name === ""}
            onClick={onClickEdit}
          >
            保存
          </EditButton>
        </ModalFooter>
      </Modal>
      <BootstrapModal
        show={deleteDialogShow}
        onHide={() => setDeleteDialogShow(false)}
      >
        <BootstrapModal.Header closeButton>
          <BootstrapModal.Title>プロジェクトの削除</BootstrapModal.Title>
        </BootstrapModal.Header>
        <BootstrapModal.Body>
          このプロジェクトを本当に削除してよろしいですか？
        </BootstrapModal.Body>
        <BootstrapModal.Footer>
          <BootstrapButton
            variant="secondary"
            onClick={() => setDeleteDialogShow(false)}
          >
            いいえ
          </BootstrapButton>
          <BootstrapButton variant="danger" onClick={handleDelete}>
            はい
          </BootstrapButton>
        </BootstrapModal.Footer>
      </BootstrapModal>
    </>
  );
};

const ModalHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
`;

const ModalContent = styled.div`
  border: 1px solid ${theme.colors.textInputBorder};
  border-radius: 3px;
  padding: 20px;
  display: flex;
  gap: 16px;
  flex-direction: column;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
`;

const Input = styled.input`
  background-color: ${theme.colors.backgroundInput};
  border: 1px solid ${theme.colors.textInputBorder};
  border-radius: 3px;

  &:hover {
    color: ${theme.colors.primaryblue};
    background-color: ${theme.colors.backgroungHover};
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
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

const CreateButton = styled(Button)<{ editFlag: boolean }>`
  ${({ editFlag }) => editFlag && "display: none"};
`;

const EditButton = styled(Button)<{ editFlag: boolean }>`
  ${({ editFlag }) => !editFlag && "display: none"};
`;

const DeleteButton = styled.button`
  color: ${theme.colors.textLowEmphasis};
  text-decoration: underline;

  &:hover {
    color: red;
  }
`;
