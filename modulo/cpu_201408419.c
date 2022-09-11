#include <linux/module.h>	/* Nesesario para todos los modulos */
#include <linux/kernel.h>	/* Nesesario para informacion del kernel */

#include <linux/init.h>		/* Nesesario para macros */
#include <linux/proc_fs.h>
#include <asm/uaccess.h>
#include <linux/seq_file.h>
#include <linux/hugetlb.h>

#include <linux/sched.h>
#include <linux/mm.h>
#include <linux/cred.h>

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Creacion de modulo, Laboratorio Sistemas Operativos 1");
MODULE_AUTHOR("Wilfred Stewart Perez Solorzano");

//struct task_struct * cpu;
//struct task_struct * hijos;
//struct list_head * listProcesos;

struct task_struct *proceso, *hijo;
struct list_head *hijos;

//Funcion que se ejecutara que se lea el archivo con el comando CAT
static int escribir_archivo(struct seq_file *archivo, void *v)
{    
    /*unsigned long rss;

    bool aux = true;
    bool aux2 = true;
    seq_printf(archivo, "{\n\"Procesos\":[\n");
    for_each_process(cpu){
        if(aux){
            seq_printf(archivo, "\n");
            aux = false;
        }else{
            seq_printf(archivo, ",\n");
        }
        //rss = get_mm_rss(cpu->mm) << PAGE_SHIFT;
        seq_printf(archivo, "{\n");
        seq_printf(archivo, "\"idp\":\"%d\",\n", cpu->pid);                                 //para id
        seq_printf(archivo, "\"nproceso\":\"%s\",\n", cpu->comm);                           //para nombre
        //seq_printf(archivo, "\"statep\":\"%d\",\n", cpu->__state);                            //para estado
        //seq_printf(archivo, "\"ramp\":\"%lu\",\n", rss);                                     //para ram
        //seq_printf(archivo, "\"userp\":\"%d\",\n", __kuid_val(cpu->cred->uid));           //para Usuario
        seq_printf(archivo, "\"hijos\":[\n");
        aux2=true;
        list_for_each(listProcesos, &(cpu->children)){
            hijos = list_entry(listProcesos, struct task_struct, sibling);
            if(aux2){
                seq_printf(archivo, "\n{\n");
                aux2 = false;
            }else{
                seq_printf(archivo, ",\n{\n");
            }           
            //seq_printf(archivo, "   ");
            seq_printf(archivo, "\"hid\":\"%d\",\n", hijos->pid);
            //seq_printf(archivo, "\"hid\":\"%d\",\n", );
            //seq_printf(archivo, " --------> ");
            seq_printf(archivo, "\"hnombre\":\"%s\"\n", hijos->comm);
            seq_printf(archivo, "}");
        }
        seq_printf(archivo, "]\n");
        seq_printf(archivo, "}\n");
    }
    seq_printf(archivo, "]\n}");*/

    unsigned long rss;

	seq_printf(archivo, "[ { \"Nombre\": \"\", \"PID\": -1, \"Estado\": \"-1\", \"RAM\": -1, \"UID\": -1, \"Usuario\": \"\", \"SubProcesos\": [] }");

	for_each_process(proceso){
		if (proceso->mm) {
			rss = get_mm_rss(proceso->mm) << PAGE_SHIFT;
			seq_printf(archivo, ", { \"Nombre\": \"%s\", \"PID\": %d, \"Estado\": \"%d\", \"RAM\": %lu, \"UID\": %d, \"Usuario\": \"\", \"SubProcesos\": ", proceso->comm, proceso->pid, proceso->__state, rss, __kuid_val(proceso->cred->uid));
		} else {
			seq_printf(archivo, ", { \"Nombre\": \"%s\", \"PID\": %d, \"Estado\": \"%d\", \"RAM\": 0, \"UID\": %d, \"Usuario\": \"\", \"SubProcesos\": ", proceso->comm, proceso->pid, proceso->__state, __kuid_val(proceso->cred->uid));
		}

		seq_printf(archivo, "[ { \"Nombre\": \"\", \"PID\": -1, \"Estado\": \"-1\", \"RAM\": -1, \"UID\": -1, \"Usuario\": \"\", \"SubProcesos\": [] }");

		list_for_each(hijos, &(proceso->children)){
			hijo = list_entry(hijos, struct task_struct, sibling);

			if (hijo->mm) {
				rss = get_mm_rss(hijo->mm) << PAGE_SHIFT;
				seq_printf(archivo, ", { \"Nombre\": \"%s\", \"PID\": %d, \"Estado\": \"%d\", \"RAM\": %lu, \"UID\": %d, \"Usuario\": \"\", \"SubProcesos\": [] }", hijo->comm, hijo->pid, hijo->__state, rss, __kuid_val(hijo->cred->uid));
			} else {
				seq_printf(archivo, ", { \"Nombre\": \"%s\", \"PID\": %d, \"Estado\": \"%d\", \"RAM\": 0, \"UID\": %d, \"Usuario\": \"\", \"SubProcesos\": [] }", hijo->comm, hijo->pid, hijo->__state, __kuid_val(hijo->cred->uid));
			}
		}

		seq_printf(archivo, "]}");
	}
	seq_printf(archivo, "]");
    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("cpu_201408419", 0, NULL, &operaciones);
    printk(KERN_INFO "Wilfred Stewart Perez Solorzano\n");
    return 0;
}
//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("cpu_201408419", NULL);
    printk(KERN_INFO "Segundo Semestre 2022\n");
}

module_init(_insert);
module_exit(_remove);