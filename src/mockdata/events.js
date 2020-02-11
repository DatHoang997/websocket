const Events = [
  {
    event: "Absorption(int256 amount, uint256 supply, bool emptive)"
  },
  {
    event: "Stop()"
  },
  {
    event: "Revoke(address indexed maker)"
  },
  {
    event: "Propose(address indexed maker, int256 amount, uint256 stake, uint256 lockdownExpiration, uint256 slashingRate)"
  },
  {
    event: "Preemptive(address indexed maker, uint256 stake, uint256 lockdownExpiration, uint256 unlockNumber)"
  },
  {
    event: "Slash(address indexed maker, uint256 amount)"
  },
  {
    event: "Unlock(address indexed maker)"
  },
  {
    event: "OwnershipTransferred(address indexed previousOwner, address indexed newOwner)"
  }
];

export default Events;