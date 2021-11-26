module.exports = {
  animation: {
    'bounce-in-top': 'bounce-in-top 0.5s both',
    'slide-in-left':
      'slide-in-left 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-in-top':
      'slide-in-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-in-right':
      'slide-in-right 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-in-bottom':
      'slide-in-bottom 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-out-left':
      'slide-out-left 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-out-top':
      'slide-out-top 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-out-right':
      'slide-out-right 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
    'slide-out-bottom':
      'slide-out-bottom 0.25s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',

    'fade-in': 'fade-in 0.25s ease both',

    'fade-out': 'fade-out 0.25s ease both',

    'jello-horizontal': 'jello-horizontal 0.5s both',
    'jello-vertical': 'jello-vertical 0.5s both',
    spin: 'spin 2s both linear infinite',
  },
  keyframes: {
    'bounce-in-top': {
      '0%': {
        transform: 'translateY(-500px)',
        animationTimingFunction: 'ease-in',
        opacity: 0,
      },
      '38%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
        opacity: 1,
      },
      '55%': {
        transform: 'translateY(-65px)',
        animationTimingFunction: 'ease-in',
      },
      '72%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
      '81%': {
        transform: 'translateY(-28px)',
        animationTimingFunction: 'ease-in',
      },
      '90%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
      '95%': {
        transform: 'translateY(-8px)',
        animationTimingFunction: 'ease-in',
      },
      '100%': {
        transform: 'translateY(0)',
        animationTimingFunction: 'ease-out',
      },
    },
    'slide-in-left': {
      '0%': {
        transform: 'translateX(-100%)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    'slide-in-right': {
      '0%': {
        transform: 'translateX(100%)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },
    'slide-in-top': {
      '0%': {
        transform: 'translateY(-100%)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
    },
    'slide-in-bottom': {
      '0%': {
        transform: 'translateY(100%)',
        opacity: 0,
      },
      '100%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },

    'slide-out-left': {
      '0%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
      '100%': {
        transform: 'translateX(-100%)',
        opacity: 0,
      },
    },
    'slide-out-right': {
      '0%': {
        transform: 'translateX(0)',
        opacity: 1,
      },
      '100%': {
        transform: 'translateX(100%)',
        opacity: 0,
      },
    },
    'slide-out-top': {
      '0%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
      '100%': {
        transform: 'translateY(-100%)',
        opacity: 0,
      },
    },
    'slide-out-bottom': {
      '0%': {
        transform: 'translateY(0)',
        opacity: 1,
      },
      '100%': {
        transform: 'translateY(100%)',
        opacity: 0,
      },
    },

    'fade-in': {
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      },
    },

    'fade-out': {
      '0%': {
        opacity: 1,
      },
      '100%': {
        opacity: 0,
      },
    },

    'jello-horizontal': {
      '0%': {
        transform: 'scale3d(1, 1, 1)',
      },
      '30%': {
        transform: 'scale3d(1.25, 0.75, 1)',
      },
      '40%': {
        transform: 'scale3d(0.75, 1.25, 1)',
      },
      '50%': {
        transform: 'scale3d(1.15, 0.85, 1)',
      },
      '65%': {
        transform: 'scale3d(0.95, 1.05, 1)',
      },
      '75%': {
        transform: 'scale3d(1.05, 0.95, 1)',
      },
      '100%': {
        transform: 'scale3d(1, 1, 1)',
      },
    },

    'jello-vertical': {
      '0%': {
        transform: 'scale3d(1, 1, 1)',
      },
      '30%': {
        transform: 'scale3d(0.75, 1.25, 1)',
      },
      '40%': {
        transform: 'scale3d(1.25, 0.75, 1)',
      },
      '50%': {
        transform: 'scale3d(0.85, 1.15, 1)',
      },
      '65%': {
        transform: 'scale3d(1.05, 0.95, 1)',
      },
      '75%': {
        transform: 'scale3d(0.95, 1.05, 1)',
      },
      '100%': {
        transform: 'scale3d(1, 1, 1)',
      },
    },
    spin: {
      '0%': {
        transform: 'rotate3d(0deg, 0, 0)',
      },
      '100%': {
        transform: 'rotate3d(360deg, 0, 0)',
      },
    },
  },
};
