import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  ListboxSection,
} from "@heroui/react";
import clsx from "clsx";
import React, { useEffect, useMemo } from "react";

import { updateFilterAndFetch } from "@/store/slices/assessmentSlice";
import { useAppDispatch, useAppSelector } from "@/lib/utils/hooks";

export const ListboxWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full sm:max-w-[200px] max-w-[80%] border-r-small px-1 py-2 rounded-small border-default-200 dark:border-default-100">
    {children}
  </div>
);

interface GroupKey {
  board: string;
  cls: string;
  section: string;
}

const toKey = (group: GroupKey) =>
  `${group.board}::${group.cls}::${group.section}`;

export default function SideNavBar() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const currentFilter = useAppSelector(
    (state) => state.assessments.currentFilter,
  );

  const groups = useMemo(() => {
    const groupMap = new Map<
      string,
      { group: GroupKey; subjects: Set<string> }
    >();

    if (userInfo.data?.classes) {
      userInfo.data.classes.forEach(
        ({ board, class: cls, subject, sections }) => {
          sections.forEach((section) => {
            const group: GroupKey = { board, cls, section };
            const key = toKey(group);

            if (!groupMap.has(key)) {
              groupMap.set(key, { group, subjects: new Set() });
            }
            groupMap.get(key)?.subjects.add(subject);
          });
        },
      );
    }
    const result: Record<string, { group: GroupKey; subjects: string[] }> = {};

    groupMap.forEach((value, key) => {
      result[key] = {
        group: value.group,
        subjects: Array.from(value.subjects),
      };
    });

    return result;
  }, [userInfo]);

  useEffect(() => {
    if (!currentFilter.board && Object.keys(groups).length > 0) {
      const firstGroupKey = Object.keys(groups)[0];
      const { group, subjects } = groups[firstGroupKey];

      if (subjects.length > 0) {
        console.log(group);
        dispatch(
          updateFilterAndFetch({
            board: group.board,
            class: group.cls,
            section: group.section,
            subject: subjects[0],
          }),
        );
      }
    }
  }, [currentFilter, groups, dispatch]);

  const isSelected = (group: GroupKey, subject: string) =>
    currentFilter.board === group.board &&
    currentFilter.class === group.cls &&
    currentFilter.section === group.section &&
    currentFilter.subject === subject;

  return (
    <ListboxWrapper>
      {/* Dropdown for small screens */}
      <div className="block sm:hidden">
        <Dropdown>
          <DropdownTrigger>
            <Button>Subjects</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Subjects">
            {Object.entries(groups).map(([groupKey, { group, subjects }]) => (
              <DropdownSection
                key={groupKey}
                title={`${group.board} - ${group.cls} - ${group.section}`}
              >
                {subjects.map((subject) => (
                  <DropdownItem
                    key={`${groupKey}::${subject}`}
                    className={clsx(
                      isSelected(group, subject) && "text-primary",
                    )}
                    onPress={() =>
                      dispatch(
                        updateFilterAndFetch({
                          board: group.board,
                          class: group.cls,
                          section: group.section,
                          subject,
                        }),
                      )
                    }
                  >
                    {subject}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* Listbox for larger screens */}
      <div className="hidden sm:block">
        <Listbox aria-label="Subjects" variant="flat">
          {Object.entries(groups).map(([groupKey, { group, subjects }]) => (
            <ListboxSection
              key={groupKey}
              className="m-2"
              title={`${group.board} - ${group.cls} - ${group.section}`}
            >
              {subjects.map((subject) => (
                <ListboxItem
                  key={`${groupKey}::${subject}`}
                  className={clsx(isSelected(group, subject) && "text-primary")}
                  onPress={() =>
                    dispatch(
                      updateFilterAndFetch({
                        board: group.board,
                        class: group.cls,
                        section: group.section,
                        subject,
                      }),
                    )
                  }
                >
                  {subject}
                </ListboxItem>
              ))}
            </ListboxSection>
          ))}
        </Listbox>
      </div>
    </ListboxWrapper>
  );
}
