import { 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Container,
  Paper,
  LinearProgress,
  Avatar,
  Fade,
  Grow,
  Divider
} from '@mui/material';
import {
  PeopleAlt,
  Assessment,
  Timeline,
  EmojiEvents
} from '@mui/icons-material';
import { useAuth0 } from "@auth0/auth0-react"
import { motion } from 'framer-motion';

function Dashboard() {
  const { user } = useAuth0();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in timeout={1000}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 4,
          p: 3,
          background: 'rgba(255, 255, 255, 0.8)',
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <Avatar
            src={user?.picture}
            alt={user?.name}
            sx={{ 
              width: 80, 
              height: 80,
              border: '3px solid #fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />
          <Box sx={{ ml: 3 }}>
            <Typography variant="h4" gutterBottom>
              Welcome, {user?.name || 'User'}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
        </Box>
      </Fade>
      
      <Grid container spacing={3}>
        {[
          { title: 'Total Quizzes', value: '24', icon: Assessment, color: '#2196F3', gradientColor: '#21CBF3' },
          { title: 'Participants', value: '156', icon: PeopleAlt, color: '#FF9800', gradientColor: '#FFB74D' },
          { title: 'Avg. Score', value: '82%', icon: Timeline, color: '#4CAF50', gradientColor: '#81C784' },
          { title: 'Top Score', value: '98%', icon: EmojiEvents, color: '#9C27B0', gradientColor: '#BA68C8' }
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Grow in timeout={1000 + (index * 200)}>
              <Card 
                component={motion.div}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                sx={{ 
                  height: '100%',
                  background: `linear-gradient(45deg, ${item.color} 30%, ${item.gradientColor} 90%)`,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease-in-out'
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
                    <Box>
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="h4">{item.value}</Typography>
                    </Box>
                    <item.icon sx={{ fontSize: 40 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grow>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Fade in timeout={2000}>
            <Paper 
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              sx={{ 
                p: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                Recent Activity
              </Typography>
              <Divider sx={{ mb: 3 }} />
              {[1, 2, 3].map((item) => (
                <Box 
                  component={motion.div}
                  whileHover={{ x: 10 }}
                  key={item} 
                  sx={{ 
                    mb: 3,
                    p: 2,
                    borderRadius: 1,
                    '&:hover': {
                      background: 'rgba(0, 0, 0, 0.02)'
                    }
                  }}
                >
                  <Typography variant="subtitle1" gutterBottom>
                    Quiz {item}: Mathematics Basics
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Completed by 12 participants
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={75} 
                    sx={{ 
                      height: 8, 
                      borderRadius: 5,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)'
                      }
                    }}
                  />
                </Box>
              ))}
            </Paper>
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;

