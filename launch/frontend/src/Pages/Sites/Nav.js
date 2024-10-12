import './Nav.css';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import './NavMenu.css';
import {
  PersonIcon,
  ReaderIcon,
  BackpackIcon,
  ExternalLinkIcon
} from '@radix-ui/react-icons';
import { useParams } from "react-router-dom";

function Nav() {
  const { id } = useParams();

  const logOut = () => {
    localStorage.clear();
    window.location.href = "/signup"
};

  return (
    <div className="Nav">
      <div className='Logo'>Toggle</div>
      <div className='btns'>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
              D
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className="DropdownMenuContent" sideOffset={15}>
              <DropdownMenu.Item onClick={()=>{window.location.href = '/profile/'+id}} className="DropdownMenuItem">
                <PersonIcon />Dhiraj Kadam
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem">
                <ReaderIcon />Sites
              </DropdownMenu.Item>
              <DropdownMenu.Item className="DropdownMenuItem">
              <BackpackIcon />Creator Page <span>Coming soon</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={logOut} className="DropdownMenuItem">
              <ExternalLinkIcon /> Logout
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

      </div>
    </div>
  );
}

export default Nav;
