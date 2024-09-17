'use client';

import Link from 'next/link';
import styled from 'styled-components';

import clsx from 'clsx';

import { SubRoute } from '@/types/nav-routes';

import { getPathColor } from '@/lib/get-path-color';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useState } from 'react';
import H3 from '../styled/h3';
import { getColorByName } from '@/lib/get-color-by-name';

interface NavButtonProps {
  name: string;
  path: string;
  slug: string;
  subroutes?: SubRoute[];
  isActive: boolean;
}

interface StyledLiButtonProps {
  hoverColor: string;
}
interface StyledNavRouteProps {
  hoverColor: string;
}
interface StyledNavSubRouteProps {
  hoverColor: string;
}
interface StyledNavFinalRouteProps {
  hoverColor: string;
}

const StyledNavRoute = styled.div<StyledNavRouteProps>`
  box-sizing: border-box;
  background-color: transparent;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor}; /* Couleur dynamique au survol */
  }
`;
const StyledNavSubRoute = styled.div<StyledNavSubRouteProps>`
  box-sizing: border-box;
  background-color: white-smoke;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor}; /* Couleur dynamique au survol */
  }
`;
const StyledNavFinalRoute = styled.div<StyledNavFinalRouteProps>`
  box-sizing: border-box;
  background-color: white-smoke;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor}; /* Couleur dynamique au survol */
  }
`;
const StyledRouteButton = styled.button<StyledLiButtonProps>`
  background-color: transparent;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  width: 11rem;
  height: 3rem;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor}; /* Couleur dynamique au survol */
    > u {
      display: block;
    }
  }
`;
const StyledRouteLi = styled.li`
  position: relative;
`;

const StyledSubrouteButton = styled.button<StyledLiButtonProps>`
  background-color: transparent;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
  width: 11rem;
  height: 3rem;
  &:hover {
    background-color: ${(props) =>
      props.hoverColor}; /* Couleur dynamique au survol */
  }
`;

export const NavButton = ({
  name,
  path,
  isActive,
  subroutes,
}: NavButtonProps) => {
  const [hoverClass, setHoverClass] = useState('bg-white-50');

  const [showDropDown, setShowDropdown] = useState(true);

  useEffect(() => {
    const handleClick = () => {
      if (!showDropDown) setShowDropdown(true);
    };

    window.addEventListener('mousemove', handleClick);
    return () => {
      window.removeEventListener('mousemove', handleClick);
    };
  }, [showDropDown]);

  //   const active = useCallback(pathname.includes(rubric.path), [pathname])
  const handleClick = useCallback(() => {
    setShowDropdown(false);
  }, []);

  const dynamicColor = useCallback((): string => {
    // Récupère le nom de la couleur associé au path
    const buttonHoverColor = getPathColor(path);

    // Convertit le nom de la couleur en une valeur valide pour CSS
    return getColorByName(buttonHoverColor);
  }, [path]);

  return (
    <StyledNavRoute
      hoverColor={dynamicColor()}
      className="col-span-1 relative  group bg-transparent"
    >
      <div className="text-3xl uppercase tracking-wide text-secondary h-[4rem] w-full flex items-center justify-center xl:tracking-widest">
        <Link href={path}>{name}</Link>
      </div>
      <div className="absolute w-full invisible group-hover:visible bg-transparent">
        {subroutes &&
          subroutes.map((subroute) => (
            <StyledNavSubRoute
              key={subroute.slug}
              hoverColor={dynamicColor()}
              className="relative group2 bg-gray-100 w-full my-1"
            >
              <div className="h-[4rem] flex items-center justify-center text-2xl tracking-wider text-secondary">
                <Link href={subroute.path}>{subroute.name} </Link>
              </div>
              <div className="absolute w-full top-0 left-full invisible group2-hover:visible bg-transparent">
                {subroute.finalroutes &&
                  subroute.finalroutes.map((finalroute) => (
                    <StyledNavFinalRoute
                      key={finalroute.slug}
                      hoverColor={dynamicColor()}
                      className="text-2xl tracking-wider h-[4rem] w-full flex items-center justify-center bg-gray-100 mx-1 mb-1"
                    >
                      <Link href={finalroute.path}>{finalroute.name} </Link>
                    </StyledNavFinalRoute>
                  ))}
              </div>
            </StyledNavSubRoute>
          ))}
      </div>
    </StyledNavRoute>
  );
};

// <ul>
//   <li>Icon </li>
//   <StyledRouteLi>
//     <StyledRouteButton
//       hoverColor={dynamicColor}
//       className="text-secondary text-2xl uppercase tracking-widest"
//       onClick={handleClick}
//     >
//       <Link href={path}>{name}</Link>
//     </StyledRouteButton>
//     {showDropDown && (
//       <ul className="absolute hidden m-0 w-[11rem] z-20 bg-transparent">
//         {subroutes &&
//           subroutes.map((subroute) => (
//             <li key={subroute.slug}>
//               <StyledSubrouteButton hoverColor={dynamicColor}>
//                 <Link href={subroute.path}>{subroute.name}</Link>
//               </StyledSubrouteButton>
//             </li>
//           ))}
//       </ul>
//     )}
//   </StyledRouteLi>
// </ul>

// <ul className="relative w-full flex flex-col items-center justify-center">
//   {/* Premier élément de la liste */}
//   {/* <li className="py-4">EmoiJ</li> */}

//   {/* Li principal avec lien, qui déclenche l'apparition de la première div */}
//   <li className="relative cursor-pointer py-4 w-full bg-transparent text-center group inline-block">
//     <div
//       className={`inline-block w-full h-[5vh] hover:bg-${buttonHoverColor}`}
//     >
//       <Link href={path}>
//         <span className="uppercase lg:text-lg xl:text-2xl 2xl:text-3xl">
//           {name}
//         </span>
//       </Link>
//     </div>

//     {/* Première div enfant qui apparaît en dessous au survol */}
//     <div className="absolute w-full left-0 top-full mt-2 p-4 bg-gray-200 border border-gray-400 hidden group-hover:inline-block">
//       Je suis la div enfant 1
//       {/* Deuxième div enfant qui apparaît à droite au survol de la première div */}
//       <div className="absolute top-0 left-full ml-2 p-4 bg-gray-400 border border-gray-600 hidden group-hover:inline-block">
//         Je suis la div enfant 2
//       </div>
//     </div>
//   </li>

//   {/* Dernier élément de la liste */}
//   <li className={`w-[50%] h-1 ${isActive ? 'bg-slate-300' : ''}`} />
// </ul>
// <ul
//   className={clsx(
//     'relative inline-block bg-transparent',
//     // hoverClass
//     `hover:bg-yellow-50`
//   )}
// >
//   <Link href={path}>{name} </Link>
//   {showDropDown && (
//     <li className="absolute hidden z-10 m-0 btn-width bg-transparent">
//       {
//         subroutes &&
//           subroutes.map((subroute) => (
//             <div
//               key={subroute.slug}
//               onClick={handleClick}
//               className="h-[3rem] w-[11rem] box-border border-solid border-0 inline-block relative
//               bg-white text-center cursor-pointer mt-1 border-white min-w-full
//               hover:bg-red-400 text-secondary-dark"
//             >
//               <Link href={subroute.path}>
//                 <H3>{subroute.name} </H3>
//               </Link>
//             </div>
//           ))
//         // const StyledCategoryLi = withTheme(
//         //     styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
//         //       background: 'whitesmoke',
//         //       textAlign: 'center',
//         //       boxSizing: 'border-box',
//         //       cursor: 'pointer',
//         //       marginTop: '1px',
//         //       border: 'white',
//         //       minWidth: '100%',
//         //       '&:hover': {
//         //         background: ({ bgcolor }) => bgcolor || 'transparent',
//         //         color: ({ theme }) => theme.palette.secondary.dark,
//         //         '& >ul': {
//         //           // display: 'block',
//         //         },
//         //       },
//         //     })
//         //     <StyledCategoryLi
//         //     key={category.state.alias}
//         //     bgcolor={rubcolor}
//         //     className="btn-size dropdown"
//         //     onClick={handleClick}
//         //     role="presentation"
//         //   >
//         //     <StyledNavLink
//         //       to={{
//         //         pathname: category.path,
//         //         state: category.state,
//         //       }}
//         //     >
//       }
//     </li>
//   )}
// </ul>

/* sizing */
// .btn-size {
//     height: 3rem;
//     width: 11rem;
//     border: solid 0px;
//     box-sizing: border-box;
//   }
//   .btn-width {
//     min-width: 11rem;
//     box-sizing: border-box;
//   }
//   .btn-height {
//     height: 3rem;
//   }

// .dropdown {
//     display: inline-block;
//     position: relative;
//   }
//   .dropdown-content {
//     position: absolute;
//     display: none;
//     z-index: 1;
//     margin: 0;
//   }
//   .dropdown:hover > .dropdown-content {
//     display: block;
//   }

// const StyledRubricLi = withTheme(
//     styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
//       background: 'transparent',
//       textAlign: 'center',
//       width: '100%',
//       boxSizing: 'border-box',
//       cursor: 'pointer',
//       '&:hover': {
//         background: ({ bgcolor }) => bgcolor || 'transparent',
//         color: ({ theme }) => theme.palette.secondary.dark,
//       },
//     })
//   )

// const StyledCategoryLi = withTheme(
//     styled(({ bgcolor, theme, ...rest }) => <li {...rest} />)({
//       background: 'whitesmoke',
//       textAlign: 'center',
//       boxSizing: 'border-box',
//       cursor: 'pointer',
//       marginTop: '1px',
//       border: 'white',
//       minWidth: '100%',
//       '&:hover': {
//         background: ({ bgcolor }) => bgcolor || 'transparent',
//         color: ({ theme }) => theme.palette.secondary.dark,
//         '& >ul': {
//           // display: 'block',
//         },
//       },
//     })

// const StyledChapterUl = withTheme(
//     styled(({ bgcolor, theme, ...rest }) => <ul {...rest} />)({
//       position: 'absolute',
//       display: 'none',
//       top: 0,
//       left: '100%',
//       margin: 0,
//       '& >li': {
//         background: 'whitesmoke',
//         '&:hover': {
//           background: ({ bgcolor }) => bgcolor || 'transparent',
//         },
//       },
//     })
//   )

// const StyledLine = withTheme(
//     styled(({ active, theme, ...rest }) => <li {...rest} />)({
//       minHeight: '3px',
//       width: '50px',
//       margin: '0px auto ',
//       background: ({ active, theme: { palette } }) =>
//         active ? palette.secondary.dark : 'transparent',
//     })
//   )

/* <li className="btn-width">
<ul>
  <li>
    <StyledIconBox bgcolor={rubcolor} fontsize="2.2rem">
      <Icons alias={state.alias} />
    </StyledIconBox>
  </li>
  <StyledRubricLi
    className="dropdown btn-size"
    bgcolor={rubcolor}
    onClick={handleClick}
    role="presentation"
  >
    <StyledNavLink
      to={{
        pathname: rubric.path,
        state: state,
      }}
    >
      <Typography variant="h2">{rubric.state.name}</Typography>
    </StyledNavLink>
    ----------------------------------------------------
    {showDropDown && (
      <ul className="dropdown-content btn-width bg-transparent">
      -----------
        {routes &&
          routes.map((category) => (
            <StyledCategoryLi
              key={category.state.alias}
              bgcolor={rubcolor}
              className="btn-size dropdown"
              onClick={handleClick}
              role="presentation"
            >
              <StyledNavLink
                to={{
                  pathname: category.path,
                  state: category.state,
                }}
              >
                <Typography variant="h4">
                  {category.state.name}
                </Typography>
              </StyledNavLink>{' '}
---------------------
              {category.routes && (
                <StyledChapterUl
                  bgcolor={rubcolor}
                  className="dropdown-content"
                >
                  {
                    // eslint-disable-next-line
                    category.routes.map((chapter) => (
                      <li
                        key={chapter.path}
                        className="btn-size"
                        onClick={handleClick}
                        role="presentation"
                      >
                        <StyledNavLink
                          to={{
                            pathname: chapter.path,
                            state: chapter.state,
                          }}
                        >
                          <Typography variant="h4">
                            {chapter.state.name || 'hello'}{' '}
                          </Typography>{' '}
                        </StyledNavLink>
                      </li>
                    ))
                  }
                </StyledChapterUl>
              )}
            </StyledCategoryLi>
          ))}
      </ul>
    )}
  </StyledRubricLi>
  <StyledLine active={active} />
</ul>
</li> */
