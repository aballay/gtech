import React, { useEffect } from 'react';
import 'datatables.net-select'
import "../../lib/css/jquery/jquery.dataTables.min.css"
import moment from 'moment';
import UtilitiesShared from '../utilities/UtilitiesShared';
const $ = require('jquery');
$.DataTable = require('datatables.net');



class DataTableController{
    ID_DATA_TABLE =  "dynamic-table";

    constructor(data,type,setDataRow,dates,statesFilter,paging,info=true,reload=true){
        this.initParamsDataTable(type);
        this.data = data;
        this.setDataRow = setDataRow;
        this.dates = dates;
        this.statesFilter = statesFilter;
        this.paging = paging;
        this.info = info;
        this.reload = reload;
        this.table = this.initDataTable();
        this.initSelection();


    }

    static getIdDataTable(){
        return this.ID_DATA_TABLE;
    }

    //Iinicializa al altura de la dataTable segun el tipo
    //Inicializa el header-columnas de la data table segun el tipo de tabla a mostrar.
    initParamsDataTable(pType){
        switch(pType){
            case UtilitiesShared.TYPES_DATA_TABLES_KEY.CLIENT:
                this.columns = UtilitiesShared.COLUMNS_CLIENTS;
                this.height = UtilitiesShared.HEIGHT_DATA_TABLE_CLIENTS;
                break;
        }

    }

    initSelection(){
        if(!this.reload ){
            this.table.on('select', (e, dt, type, index) => {
                // console.log("select row : ",dt.context[0].aoData[index]._aData);
                this.setDataRow(dt.context[0].aoData[index]._aData);
            })
            this.table.on('deselect', () => {
                this.setDataRow(null);
            })
        }
    }
    setBackgroundColorRow(pRow,pBgColor){
        $('td', pRow).css('background-color', pBgColor);
    }

    setColorTextRow(pRow,pColor){
        $('td', pRow).css('color', pColor);
    }
    //Renderiza los colores por fecha.

    setStyleRow(pRow,pColor,pBgColor){
        this.setBackgroundColorRow(pRow,pBgColor);
        this.setColorTextRow(pRow,pColor)
    }

    renderStatesFilter(pRow,pData){
        if(this.statesFilter){
            if(pData.state !== "Entregado"){
                let auxColor = this.statesFilter.toRepair.color;
                let auxBgColor = this.statesFilter.toRepair.bgColor;
               if(pData.state === "Reparando"){
                auxColor = this.statesFilter.reparing.color;
                auxBgColor = this.statesFilter.reparing.bgColor;
               }
               else if(pData.state === "Reparado"){
                auxColor = this.statesFilter.repair.color;
                auxBgColor = this.statesFilter.repair.bgColor;
               }
               this.setStyleRow(pRow,auxColor,auxBgColor);
            }
        }
    }

    renderFilterDates(pRow,pData){
        if (this.dates) {
            let today = moment(new Date().toISOString().slice(0, 10));
            let dateUp = moment(pData.dateUp)
            let diff = today.diff(dateUp, 'days');
            if(pData.state !== "Reparado" && pData.state !== "Entregado"){
                //Aplica estilos recien llegado al local;
                let auxColor = this.dates.pickUp.color;
                let auxBgColor = this.dates.pickUp.bgColor;
                
                //Aplica estilos onTime (Todo ok)
                if (diff <= this.dates.onTime.value) {
                    auxColor = this.dates.onTime.color;
                    auxBgColor = this.dates.onTime.bgColor;
                } 
                //Aplica estilos late ()
                else if (diff <= this.dates.late.value) {
                    auxColor = this.dates.late.color;
                    auxBgColor = this.dates.late.bgColor;
                } 
                //Aplica estilos verylate()
                else if (diff > this.dates.late.value) {
                    auxColor =this.dates.veryLate.color;
                    auxBgColor = this.dates.veryLate.bgColor;
                }

                this.setStyleRow(pRow,auxColor,auxBgColor);
            }
           
        }
    }

    initDataTable(){
        const mDates = this.dates;
        const mFilter = this.statesFilter;
        const mRenderDatesFilter =  this.renderFilterDates;
        const mRenderStatesFilter = this.renderStatesFilter;
        return $(`#${this.ID_DATA_TABLE}`).DataTable({
            "scrollY": this.height,
            "scrollX": true,
            "destroy": true,
            "pageLength": 20,
            "info": this.info,
            "bLengthChange": false,
            language: {
                "decimal": "",
                "emptyTable": "No existen datos para mostrar. Compruebe su conexión a internet.",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ registros",
                "infoEmpty": "Mostrando 0 a 0  de 0 registros",
                "infoFiltered": "(Filtro de _MAX_ total registros)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ registros",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "No se encontraron coincidencias con los parametros de busqueda",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                },
                "aria": {
                    "sortAscending": ": Activar orden de columna ascendente",
                    "sortDescending": ": Activar orden de columna desendente"
                },

            },
            "paging": this.paging,
            "fnRowCallback": function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
                if(mDates){
                    mRenderDatesFilter(nRow,aData);
                }
                if(mFilter){
                    mRenderStatesFilter(nRow,aData);
                }
            },
            select:true,
            select: {
                style: 'single',
                info: false,
            },
            data: this.data,
            columns: this.columns,
    })
    }
}

function DataTable({ data, type, setDataRow, dates,statesFilter, paging, info = true,reload=false }) {
    useEffect(() => {
        //Inicializa la datatable
        let tbl = new DataTableController(data, type, setDataRow, dates,statesFilter, paging, info = true,reload=false);
        //si la tabla esta inicializada la destruye para poder volver a renderizar
    }, [data,reload,type, setDataRow, dates, paging, info]);
    return (<>
        <table id="dynamic-table" className="display nowrap" style={{ width: "100%" }} />
    </>
    )
}

export default DataTable;