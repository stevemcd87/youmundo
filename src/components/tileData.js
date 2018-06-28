import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import MailIcon from '@material-ui/icons/Mail';
import DeleteIcon from '@material-ui/icons/Delete';
import ReportIcon from '@material-ui/icons/Report';
import Typography from '@material-ui/core/Typography';



export const otherMailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <i className="material-icons"> trending_up</i>
      </ListItemIcon>
      <h3 style={{fontFamily: 'Helvetica', color: 'rgba(0, 0, 0, 0.70)'}}>Now Trending</h3>
    </ListItem>
  </div>
);

export const mailFolderListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <i className="material-icons" style={{fontSize: '30px'}}>stay_current_portrait</i>
      </ListItemIcon>
      <h3 style={{fontFamily: 'Helvetica', color: 'rgba(0, 0, 0, 0.70)'}}>Get Updates</h3>
    </ListItem>
    <ul>
      <li>
        <ListItem button>
          <ListItemIcon>
            <a href="https://es-la.facebook.com/Telemundo/" target="_blank"><i className="fab fa-facebook-f" style={{fontSize: '30px'}}></i></a>
          </ListItemIcon>
        </ListItem>
      </li>
      <li>
        <ListItem button>
          <ListItemIcon>
            <a href="https://twitter.com/telemundo?lang=en" target="_blank"><i className="fab fa-twitter" style={{fontSize: '30px'}}></i></a>
          </ListItemIcon>
        </ListItem>
      </li>
      <li>
        <ListItem button>
          <ListItemIcon>
            <a href="https://www.instagram.com/telemundo/?hl=en" target="_blank"><i className="fab fa-instagram" style={{fontSize: '30px'}}></i></a>
          </ListItemIcon>
        </ListItem>
      </li>
    </ul>
  </div>
);
