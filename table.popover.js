/*
 * @Description: In User Settings Edit
 * @Author: Estella
 * @Date: 2019-06-19 14:33:49
 * @LastEditTime: 2019-06-27 14:10:35
 * @LastEditors: Please set LastEditors
 */

// require('./jquery.min.js')
// require('./jquery.dataTables.min.js')

const NAME = 'tablePopover';
const CLASSPREFIX = 'table-popover';
const DATA_KEY = 'tablePopover'
const JQUERY_NO_CONFLICT = $.fn[NAME];
const IDPREFIX = 'tp'

const CLASSNAME = {
    FADE: 'fade',
    SHOW: 'in',
    CONTENT: CLASSPREFIX + '-content',
    BODY: CLASSPREFIX + '-body',
    HEAD: CLASSPREFIX + '-head',
    TITLE: CLASSPREFIX + '-title',
    BACKDROP: CLASSPREFIX + '-backdrop',
    TABLEFAILED: CLASSPREFIX + '-failed',
    TABLEEMPTY: CLASSPREFIX + '-empty'
};

const IDNAME = {
    TABLE: IDPREFIX + '_table'
}

const DefaultConfig = {
    show: false,
    columns: [],
    data: [],
    width: 600,
    height: 400,
    rowIndex: false,
    tableStyle: 'table-bordered',
    chosenClose: true,
    // paging: {
    //     enable: false,
    //     length: 20
    // }
};

var Selector = {
    DATA_DISMISS: '[data-dismiss="' + CLASSPREFIX + '"]',
    BACKDROP: '.' + CLASSNAME.BACKDROP
};

var Event = {
    SHOWN: 'tp.shown',
    HIDDEN: 'tp.hidden',
    ROWSELECTED: 'tp.row-selected'
}

var Notice = {
    EMPTYCOL: '缺少创建表格必须的列',
    EMPTYROW: '表格数据为空'
}


function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);

        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }

        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }

    return target;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }

    return obj;
}


const TablePopover = function(args) {
    function TablePopover(element, config) {
        this._element = element; // DOM ELEMENT
        this._isShown = false; // CONTROL IS SHOWN
        this._title = config.title ? config.title : '';
        this._width = config.width ? config.width : DefaultConfig.width; // WIDTH
        this._height = config.height ? config.height : DefaultConfig.height; // MAX-HEIGHT
        this._config = config; // OPTIONS
        this._columns = config.columns ? config.columns : DefaultConfig.columns; // TABLE COLUMNS
        this._data = config.data ? config.data : DefaultConfig.data; // TABLE COLUMNS DATA
        // this._dataId = config['data-id']; // TABLE ROW ID
        this._rowIndex = config.hasOwnProperty('rowIndex') ? config.rowIndex : DefaultConfig.rowIndex;
        this._tableStyle = config.tableStyle && typeof(config.tableStyle) == 'string' ? config.tableStyle : DefaultConfig.tableStyle;
        // this._paging = config.paging ? config.paging : DefaultConfig.paging;
        this._chosenClose = config.hasOwnProperty('chosenClose') ? config.chosenClose : DefaultConfig.chosenClose;
        // this._paging = config.paging.enable ? config.paging : DefaultConfig.paging;
        // this.template = 
    }
    var _proto = TablePopover.prototype;

    // api - show
    _proto.show = function(relatedTarget) {
        const _this = this;
        const node = $(this._element);
        // if it's already shown, return
        if (this._isShown) {
            return;
        }

        this._isShown = true;
        node.addClass(CLASSNAME.SHOW);
        node.html(this.handleTemplate());

        if ($('#' + this._element.id + '_' + IDNAME.TABLE)) {
            const table = $('#' + this._element.id + '_' + IDNAME.TABLE).DataTable({
                lengthChange: false,
                searching: false,
                ordering: false,
                info: false,
                paging: false,
                scrollY: this.height / 2,
                scrollX: true,
                columns: this.handleColumns(),
                data: this.handleData(),
                // paging: this._paging.enable,
                // pageLength: this._paging.length,
                destroy: true
            });

            table.on('click', 'tr', function() {
                const rowSelectEvent = $.Event(Event.ROWSELECTED);
                node.trigger(rowSelectEvent, table.row(this).data());
                _this._chosenClose ? _this.hide() : null;
            });
        }

        node.on('click', Selector.BACKDROP, function(event) {
            // BACKDROP
            return _this.hide(event);
        });

        node.on('click', Selector.DATA_DISMISS, function(event) {
            // DATA-DISMISS
            return _this.hide(event);
        });


        const shownEvent = $.Event(Event.SHOWN);
        setTimeout(function() {
            node.trigger(shownEvent);
        }, 0)
    }

    _proto.hide = function() {
        const node = $(this._element);
        // $('#' + IDNAME.TABLE).DataTable().destroy().clear();
        node.removeClass(CLASSNAME.SHOW);
        // node.html('');
        node.unbind('click');
        this._isShown = false;
        const hiddenEvent = $.Event(Event.HIDDEN);
        setTimeout(function() {
            node.trigger(hiddenEvent);
        }, 0)
    }

    _proto.handleTemplate = function() {
        let template = '<div class="' + CLASSNAME.CONTENT + '" style="max-height: ' + this._height + 'px;width: ' + this._width + 'px">' +
            '<div class="' + CLASSNAME.HEAD + '"><h4 class="' + CLASSNAME.TITLE + '">' + this._title + '</h4><a data-dismiss="' + CLASSPREFIX + '">×</a></div>' +
            '<div class="' + CLASSNAME.BODY + '">';

        if (this._columns.length) {
            template += '<table width="100%" id="' + this._element.id + '_' + IDNAME.TABLE + '" class="' + (this._tableStyle ? this._tableStyle : '') + '"></table></div>' +
                '</div><div class="table-popover-backdrop"></div>';
        } else {
            template += '<p class="' + CLASSNAME.TABLEFAILED + '">表格创建失败</p></div></div><div class="table-popover-backdrop"></div>';
        }

        return template;
    }

    _proto.handleColumns = function() {
        let columns = JSON.parse(JSON.stringify(this._columns));
        if (this._rowIndex) {
            columns.unshift({ title: '序号', data: 'tp_index' });
            return columns;
        }
        return columns;
    }

    _proto.handleData = function() {
        if (this._rowIndex) {
            let data = [];
            this._data.map((rowdata, index) => {
                let rowData = JSON.parse(JSON.stringify(rowdata));
                rowData['tp_index'] = index + 1;
                data.push(rowData);
            })
            return data;
        }
        return this._data;
    }

    TablePopover._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function() {
            var data = $(this).data(DATA_KEY);
            var _config = _objectSpread({}, DefaultConfig, $(this).data(), typeof config === 'object' && config ? config : relatedTarget);

            if (!data) {
                data = new TablePopover(this, _config);
                $(this).data(DATA_KEY, data);
            }

            if (typeof config === 'string') {
                if (typeof data[config] === 'undefined') {
                    throw new TypeError("No method named \"" + config + "\"");
                }
                data[config](relatedTarget);
            } else if (!_config.show) {
                data.show(relatedTarget);
            }
        });
    };

    return TablePopover

}();

$.fn[NAME] = TablePopover._jQueryInterface;
$.fn[NAME].Constructor = TablePopover;

$.fn[NAME].noConflict = function() {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
};