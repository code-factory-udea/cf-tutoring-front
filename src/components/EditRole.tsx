import { useMutationUpdateUserRole } from "@hooks/mutations";
import { useQueryRoles } from "@hooks/queries";
import { Dropdown } from "@ui/Dropdown";
import { useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdOutlineCancel, MdOutlineModeEdit } from "react-icons/md";

interface Props {
  role: string;
  username: string;
}

export const EditRole = ({ role, username }: Props) => {
  const { data: roles } = useQueryRoles();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { mutateAsync: updateRole } = useMutationUpdateUserRole();

  const [currentRole, setCurrentRole] = useState<number | null>(null);

  const handleRoleSelect = (selectedRole: string) => {
    const roleObject = roles?.find((role) => role.role === selectedRole);
    if (roleObject) {
      setCurrentRole(roleObject.id);
    }
  };

  const handleSave = async () => {
    console.log("currentRole", currentRole);
    console.log("role", role);
    console.log("username", username);
    if (currentRole !== null) {
      await updateRole({ data: { username, idRole: currentRole }, role });
      setIsEditing(false);
    }
  };

  const editMode = () => (
    <div className="flex gap-2 items-center">
      <Dropdown
        options={roles?.map((role) => role.role) || []}
        onSelect={handleRoleSelect}
        placeholder="Seleccione un rol"
      />
      <button onClick={handleSave} className="text-green-500 text-xl">
        <FaRegCircleCheck size={18} />
      </button>
      <button onClick={() => setIsEditing(false)} className="text-red-500">
        <MdOutlineCancel size={20} />
      </button>
    </div>
  );

  const viewMode = () => (
    <div className="flex gap-2 items-center">
      <p>{role}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="text-orange-500 text-xl"
      >
        <MdOutlineModeEdit />
      </button>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center">
      {isEditing ? editMode() : viewMode()}
    </div>
  );
};
