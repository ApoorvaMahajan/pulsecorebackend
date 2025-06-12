export function fallbackNudges(data) {
  const nudges = [];
  if (data.overdueTasks > 3) {
    nudges.push({ severity: 'High', summary: `${data.overdueTasks} overdue tasks`, action: 'Reassign or escalate' });
  }
  if (data.inactiveUsers > 2) {
    nudges.push({ severity: 'Medium', summary: `${data.inactiveUsers} team members inactive`, action: 'Check in with team' });
  }
  return nudges;
}