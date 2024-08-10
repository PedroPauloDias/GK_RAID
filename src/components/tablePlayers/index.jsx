'use client'
import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useTheme
} from "@nextui-org/react";



import { capitalize } from "./utils";
import { CaretDown, Plus , MagnifyingGlass ,DotsThreeVertical} from 'phosphor-react';
import Link from 'next/link';
import { getAllPlayers , deletePlayer} from '../../services/playersServices'
// import { signOut, useSession } from 'next-auth/react'
import ModalCustom from "../modal";
import Form from "../form";
import { useRouter } from 'next/navigation';
import {Popover, PopoverTrigger, PopoverContent, } from "@nextui-org/react";






const columns = [
  { name: "ID", uid: "id",  },
  { name: "NAME", uid: "name",  },
  { name: "TAG", uid: "tag" },
  { name: "CLAN", uid: "clan", },
  { name: "PONTOS CVC", uid: "pontosCvc" },
  { name: "CHAVES JOGADAS", uid: "chavesJogadas" },
  { name: "HYDRA CLASH", uid: "hydraClash" },
  { name: "MEDIA HYDRA CLASH", uid: "mediaHydraClash"},
  { name: "STATUS", uid: "status",  },
  { name: "DETALHES", uid: "detalhes" ,  },
  { name: "ACTIONS", uid: "actions" },
 

];

const statusColorMap = {
  FICAR: "success",
  DESCER: "danger",
  OBSERVACAO: "warning",
};


const clansOptions =
[
  {name:"Unholy", uid:"Unholy"},
  {name:"Cursed", uid:"Cursed"},
  {name:"Fallen", uid:"Fallen"},
  {name:"Corrupted", uid:"Corrupted"},
]


const statusOptions = [
  { name: "FICAR", uid: "FICAR" },
  { name: "DESCER", uid: "DESCER" },
  { name: "OBSERVACAO", uid: "OBSERVACAO" },
];

const INITIAL_VISIBLE_COLUMNS = ["tag", "clan", "status", "actions"];

export default  function TablePlayers({ clan }) {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [clansFilter, setClansFilter]= useState("all");
  const [sortDescriptor, setSortDescriptor] = useState({
    
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [ isEditable , setIsEditable]= useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  const router = useRouter();

  // const { data: session } = useSession();
  
  
    // useEffect(() => {
    //   if (session?.user?.role === 'admin') {
    //     setIsAdmin(true)
    //    }
    // }, [setIsAdmin]);
    

  function NotAdmin(){
    alert("desculpe , voce nao tem autorização")
  }
  
  // useEffect(() => {
  //   if (session?.user?.role === 'admin') {
  //     setIsEditable(true)
  //    }
  // }, [setIsEditable]);
 


  useEffect(() => {
    
    async function FindAllPlayers(){
  
      const response = await getAllPlayers()
      console.log(response)
      setUsers(response.data)
      console.log(response.data)
     }
     FindAllPlayers();
  }, [setUsers]);

  const handleEditSubmit = () => {
    // Fechar o modal
    setCurrentPlayer(null);
    // Recarregar a página para pegar os novos resultados
    router.refresh()
  };
  const handleEditModalClose = () => {
    setCurrentPlayer(null);
    router.refresh()

  };
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true);
  };
  
  // Manipulador de evento para fechar o modal de edição
  const handleEditCloseModal = () => {
    setIsEditModalOpen(false);
  };

  async function deletePlayerId(userId) {
    try {
      await deletePlayer(userId);
      alert("Jogador excluído!");
      router.refresh()

    } catch (error) {
      console.error("Erro ao excluir jogador:", error);
    }
  }
 

  
 
    
  const pages = Math.ceil(users.length / rowsPerPage);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status),
      );
    }
    if (clansFilter !== "all" && Array.from(clansFilter).length !== clansOptions.length) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(clansFilter).includes(user.clan),
      );
    }

    return filteredUsers;
  }, [users, filterValue, statusFilter, clansFilter]);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);


  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
  
    if (columnKey === "name") {
      return (
        <User
          className="cursor-pointer w-full flex align-start justify-start"
        onClick={() => setCurrentPlayer(user)}
          avatarProps={{
            radius: "full", size: "sm",
            src: 'https://img.freepik.com/vetores-premium/logotipo-da-cabeca-de-bode_43623-304.jpg'
          }}
          classNames={{
            description: "text-default-500",
          }}
          description={user.email}
          name={cellValue}
        >
          {user.email}
        </User>
      );
    
    } else if (columnKey === "status") {
      return (
        <Chip
          className="capitalize border-none gap-1 text-default-600"
          color={statusColorMap[user.status]}
          size="sm"
          variant="dot"
        >
          {cellValue}
        </Chip>
      );
    } else if (columnKey === "actions") {
      return (
        <div className="relative flex justify-end items-center ">   

    <Popover placement="bottom" showArrow={true} className=' '>
      <PopoverTrigger>
        <Button className='bg-transparent rounded-6xl '>
          <DotsThreeVertical size={20} />
          </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
        <div className='flex items-center justify-center '>
                    {
                      isAdmin? (
                        <div className=' flex flex-row gap-2'>
                        <ModalCustom
                        title="Editar detalhes do jogador "
                        description="Editar"
                        onClose={handleEditModalClose}
                      >
                        <Form player={user} action="Editar"  onCloseModal={handleEditModalClose}
                         onSubmit={handleEditSubmit}/> 
                      </ModalCustom>
                       <button
                       onClick={() => deletePlayerId(user._id)}

                       type="button"
                       className='w-full flex items-center justify-center text-white text-xs bg-red-700 shadow-lg p-2 px-4 rounded-xl hover:bg-red-900 transition ease-in'
                       >
                       Delete
                     </button>
                     </div>
                      ): <button  disabled ={!isAdmin} className="bg-foreground text-background border-solid border-2 border-red-900 rounded-lg px-2">Não autorizado</button>
                    }
                
                    </div>
        </div>
      </PopoverContent>
    </Popover>
        
                   
            
        </div>
      );
    } else {
      return cellValue;
    }
  };


  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);


  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className=" text-white flex flex-col gap-2">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            classNames={{
              base: "w-full sm:max-w-[25%]",
              inputWrapper: "border-1 bg-slate-800",
            }}
            placeholder="Search by name..."
            size="sm"
            startContent={<MagnifyingGlass className="text-default-300" />}
            value={filterValue}
            variant="bordered"
            onClear={() => setFilterValue("")}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
          <Dropdown>
              <DropdownTrigger className=" ">
                <Button
                  endContent={<CaretDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Clans
                </Button>
              </DropdownTrigger>        
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={clansFilter}
                selectionMode="multiple"
                onSelectionChange={setClansFilter}
              >
                {clansOptions.map((clans) => (
                  <DropdownItem key={clans.uid} className="capitalize">
                    {capitalize(clans.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<CaretDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>        
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="">
                <Button
                  endContent={<CaretDown className="text-small" />}
                  size="sm"
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            {
              isAdmin? (
                <ModalCustom
                title="Editar detalhes do jogador 2"
                description="Add +"
                onClose={handleEditModalClose}
              >
                
                <Form player={currentPlayer} action="Add" onSubmit={handleEditSubmit} onCloseModal={handleEditModalClose} />
              </ModalCustom>
              ): <button  disabled ={!isAdmin} className="bg-foreground text-background border-solid border-2 border-red-900 rounded-lg px-2">Add</button>
            }
          
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">Total {users.length} users</span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    clansFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    users.length,
    hasSearchFilter,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="">

        <Pagination
          showControls
          classNames={{
            cursor: "bg-foreground text-background",
          }}
          color="default"
          isDisabled={hasSearchFilter}
          page={page}
          total={pages}
          variant="light"
          onChange={setPage}
        />
        <span className="text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${items.length} selected`}
        </span>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter]);

  const classNames = React.useMemo(
    () => ({
      base: ["text-primary-900"],
      wrapper: ["max-h-[382px]", "max-w-3xl"],
      tbody: ["bg-fuchisia-400"],
      th: ["bg-transparent", "text-default-500", "border-b", "border-divider"],
      td: [
        // changing the rows border radius
        // first
        "group-data-[first=true]:first:before:rounded-none",
        "group-data-[first=true]:last:before:rounded-none",
        // middle
        "group-data-[middle=true]:before:rounded-none",
        // last
        "group-data-[last=true]:first:before:rounded-none",
        "group-data-[last=true]:last:before:rounded-none",
      ],
    }),
    [],
  );

  return (
    <>
      <div>
       { isAdmin? (
         <ModalCustom
         title={currentPlayer ? `Detalhes de ${currentPlayer.name}` : "Detalhes do Jogador"}
         description={currentPlayer ? `Player: ${currentPlayer.tag}` : "Clique no NOME de um jogador para ver detalhes"}
         onClose={() => setCurrentPlayer(null)}
       >
         {currentPlayer && (
           <div className="border border-zinc-700 p-8 gap-4 flex flex-col">
             <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Nome:
               <p> {currentPlayer.name} </p>
               </div>
           
            <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Tag: 
               <p>{currentPlayer.tag} </p>
               </div>
           
             <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Clan:
               <p> {currentPlayer.clan} </p>
               </div>
           
            <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Ultimo Hydra Clash:
             <p> {currentPlayer.hydraClash} </p>
               </div>
           
            <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Media Hydra Clash:
               <p>  {currentPlayer.mediaHydraClash} </p>
               </div>
           
            <div className='flex gap-6 align-center justify-between border-zinc-700 border-b-[1px]'>Obs: 
               <p>{currentPlayer.detalhes}</p>
              </div>
              <ModalCustom  title='dkaosdk' description='Editar detalhes do jogador' >
              <Form player={currentPlayer} action="Editar" onSubmit={handleEditSubmit}  onCloseModal={handleEditModalClose}/>
              </ModalCustom>

           </div>
         )}
       </ModalCustom>

      ):
      (
        isEditModalOpen && (  // Verifica se isEditModalOpen é verdadeiro para renderizar o modal de edição
          <ModalCustom
            title="Editar detalhes do jogador 2"
            description="Descrição do modal de edição 2"
            onClose={handleEditModalClose}
          >
            {/* Renderize o formulário de edição aqui */}
            <Form player={currentPlayer} action="Editar" onSubmit={handleEditSubmit} onCloseModal={handleEditModalClose} />
          </ModalCustom>
        )
          )
      }




      <Table
        isCompact
        removeWrapper
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        checkboxesProps={{
          classNames: {
            wrapper: "after:bg-foreground after:text-background ",  
         
          },       
        }}
        classNames={classNames}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}    >
          {(column) => (
             <TableColumn
             key={column.uid}
             align={column.uid === "actions" ? "center" : "start"}
             allowsSorting={column.sortable}
           >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => <TableCell  className="text-start" >{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
        </Table>
        
      </div>
    </>
  );
}
